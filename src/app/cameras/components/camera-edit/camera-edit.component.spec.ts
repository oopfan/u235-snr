import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { CamerasModule } from '../../cameras.module';
import { routes } from '../../cameras-routing.module';
import { CameraEditComponent } from './camera-edit.component';
import { UserCameraService, CameraParsed, QuickStartGuard } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('CameraEditComponent', () => {
  let component: CameraEditComponent;
  let fixture: ComponentFixture<CameraEditComponent>;
  let el: DebugElement;
  let route: ActivatedRoute;
  let location: Location;
  let userCameraService: UserCameraService;
  let storageSpy: any;
  let storageData: any;
  let guardSpy: any;

  beforeEach(async(() => {
    storageData = {
      list: [
        {
          id: 6,
          name: 'Atik 314E',
          pixelSize: '4.65',
          readNoise: '5.3',
          darkCurrent: '0',
          quantumEfficiency: '43'
        },
        {
          id: 8,
          name: 'Altair 290M',
          pixelSize: '2.9',
          readNoise: '3.3',
          darkCurrent: '0',
          quantumEfficiency: '50'
        }
      ],
      nextid: 9
    };
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);
    guardSpy = jasmine.createSpyObj('QuickStartGuard', ['canActivate']);
    guardSpy.canActivate.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), CamerasModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        UserCameraService,
        { provide: LocalStorageService, useValue: storageSpy },
        { provide: QuickStartGuard, useValue: guardSpy }
      ]
    })
    .compileComponents();
  }));

  function create(id: string) {
    route = TestBed.get(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(id);
    location = TestBed.get(Location);
    userCameraService = TestBed.get(UserCameraService);
    fixture = TestBed.createComponent(CameraEditComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }

  it('should create', () => {
    create('-1');
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const camera: CameraParsed = {
      id: 8,
      name: 'Test Camera',
      pixelSize: 3.14,
      readNoise: 1.5,
      darkCurrent: 0,
      quantumEfficiency: 50
    };
    create(camera.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const cameraListBefore = userCameraService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      component.onSubmit(camera);
    });
    tick();
    const cameraListAfter = userCameraService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    expect(cameraListAfter.length - cameraListBefore.length).toBe(0, 'Unexpected change in number of cameras');

    const updatedCamera = userCameraService.getItem(camera.id);
    expect(updatedCamera).toBeTruthy();
    expect(updatedCamera.length).toBe(1, 'Unexpected number of cameras');
    expect(updatedCamera[0].id).toBe(camera.id, 'Unexpected id');
    expect(updatedCamera[0].name).toBe(camera.name, 'Unexpected name');
  }));

  it('should cancel', fakeAsync(() => {
    create('6');
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const cameraListBefore = userCameraService.getAll();
    fixture.ngZone.run(() => {
      component.onCancel();
    });
    tick();
    const cameraListAfter = userCameraService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(0);
    expect(cameraListAfter.length - cameraListBefore.length).toBe(0, 'Unexpected change in number of cameras');
  }));

  it('should display Camera Not Found', fakeAsync(() => {
    create('21');
    expect(component).toBeTruthy();

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.cameraNotFound, 'Unexpected Message');
  }));
});
