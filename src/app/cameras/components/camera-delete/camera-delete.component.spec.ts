import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { CamerasModule } from '../../cameras.module';
import { routes } from '../../cameras-routing.module';
import { CameraDeleteComponent } from './camera-delete.component';
import { UserCameraService } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('CameraDeleteComponent', () => {
  let component: CameraDeleteComponent;
  let fixture: ComponentFixture<CameraDeleteComponent>;
  let el: DebugElement;
  let route: ActivatedRoute;
  let location: Location;
  let userCameraService: UserCameraService;
  let storageSpy: any;
  let storageData: any;

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

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), CamerasModule ],
      providers: [
        UserCameraService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    })
    .compileComponents();
  }));

  function create(id: string) {
    route = TestBed.get(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(id);
    location = TestBed.get(Location);
    userCameraService = TestBed.get(UserCameraService);
    fixture = TestBed.createComponent(CameraDeleteComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }

  it('should create', () => {
    create('-1');
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const index = 1;
    const camera = storageData.list[index];
    create(camera.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const name = el.query(By.css('#name'));
    expect(name).toBeTruthy('Could not find name');
    expect(name.nativeElement.textContent).toBe(camera.name, 'Unexpected name');

    const pixelSize = el.query(By.css('#pixel-size'));
    expect(pixelSize).toBeTruthy('Could not find pixelSize');
    expect(pixelSize.nativeElement.textContent).toBe(camera.pixelSize, 'Unexpected pixelSize');

    const readNoise = el.query(By.css('#read-noise'));
    expect(readNoise).toBeTruthy('Could not find readNoise');
    expect(readNoise.nativeElement.textContent).toBe(camera.readNoise, 'Unexpected readNoise');

    const darkCurrent = el.query(By.css('#dark-current'));
    expect(darkCurrent).toBeTruthy('Could not find darkCurrent');
    expect(darkCurrent.nativeElement.textContent).toBe(camera.darkCurrent, 'Unexpected darkCurrent');

    const quantumEfficiency = el.query(By.css('#quantum-efficiency'));
    expect(quantumEfficiency).toBeTruthy('Could not find quantumEfficiency');
    expect(quantumEfficiency.nativeElement.textContent).toBe(camera.quantumEfficiency, 'Unexpected quantumEfficiency');

    const btn = el.query(By.css('#submit'));
    expect(btn).toBeTruthy('Could not find submit button');

    const cameraListBefore = userCameraService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      btn.nativeElement.click();
    });
    tick();
    const cameraListAfter = userCameraService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    expect(cameraListAfter.length - cameraListBefore.length).toBe(-1, 'Unexpected change in number of cameras');
  }));

  it('should cancel', fakeAsync(() => {
    create('6');
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const btn = el.query(By.css('#cancel'));
    expect(btn).toBeTruthy('Could not find cancel button');

    const cameraListBefore = userCameraService.getAll();
    fixture.ngZone.run(() => {
      btn.nativeElement.click();
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
