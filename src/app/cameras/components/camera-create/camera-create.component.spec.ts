import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { CamerasModule } from '../../cameras.module';
import { routes } from '../../cameras-routing.module';
import { CameraCreateComponent } from './camera-create.component';
import { UserCameraService, CameraParsed, QuickStartGuard } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('CameraCreateComponent', () => {
  let component: CameraCreateComponent;
  let fixture: ComponentFixture<CameraCreateComponent>;
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

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraCreateComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    userCameraService = TestBed.get(UserCameraService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    expect(component).toBeTruthy();
    const cameraListBefore = userCameraService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    const camera: CameraParsed = {
      id: -1,
      name: 'Test Camera',
      pixelSize: 3.14,
      readNoise: 1.5,
      darkCurrent: 0,
      quantumEfficiency: 50
    };
    fixture.ngZone.run(() => {
      component.onSubmit(camera);
    });
    tick();
    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    const cameraListAfter = userCameraService.getAll();
    expect(cameraListAfter.length - cameraListBefore.length).toBe(1, 'Unexpected change in number of cameras');
    const newCamera = userCameraService.getItem(9);
    expect(newCamera).toBeTruthy();
    expect(newCamera.length).toBe(1, 'Unexpected number of cameras');
    expect(newCamera[0].id).toBe(9, 'Unexpected id');
    expect(newCamera[0].name).toBe(camera.name, 'Unexpected name');
  }));

  it('should cancel', fakeAsync(() => {
    expect(component).toBeTruthy();
    const cameraListBefore = userCameraService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      component.onCancel();
    });
    tick();
    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(0);
    const cameraListAfter = userCameraService.getAll();
    expect(cameraListAfter.length - cameraListBefore.length).toBe(0, 'Unexpected change in number of cameras');
  }));
});
