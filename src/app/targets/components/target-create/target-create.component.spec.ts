import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { TargetsModule } from '../../targets.module';
import { routes } from '../../targets-routing.module';
import { TargetCreateComponent } from './target-create.component';
import { UserTargetService, TargetParsed, QuickStartGuard } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('TargetCreateComponent', () => {
  let component: TargetCreateComponent;
  let fixture: ComponentFixture<TargetCreateComponent>;
  let location: Location;
  let userTargetService: UserTargetService;
  let storageSpy: any;
  let storageData: any;
  let guardSpy: any;

  beforeEach(async(() => {
    storageData = {
      list: [
        {
          id: 24,
          name: 'M27 Dumbbell Nebula',
          surfaceBrightness: '20.2'
        },
        {
          id: 2,
          name: "M81 Bode's Galaxy",
          surfaceBrightness: '21.7'
        }
      ],
      nextid:30
    };
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);
    guardSpy = jasmine.createSpyObj('QuickStartGuard', ['canActivate']);
    guardSpy.canActivate.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        TargetsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        UserTargetService,
        { provide: LocalStorageService, useValue: storageSpy },
        { provide: QuickStartGuard, useValue: guardSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetCreateComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    userTargetService = TestBed.get(UserTargetService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    expect(component).toBeTruthy();
    const allBefore = userTargetService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    const target: TargetParsed = {
      id: -1,
      name: "My Galaxy",
      surfaceBrightness: 22.2,
      rightAscension: 0,
      declination: 0
    };
    fixture.ngZone.run(() => {
      component.onSubmit(target);
    });
    tick();
    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    const allAfter = userTargetService.getAll();
    expect(allAfter.length - allBefore.length).toBe(1, 'Unexpected change in number of targets');
    const newTarget = userTargetService.getItem(25);
    expect(newTarget).toBeTruthy();
    expect(newTarget.length).toBe(1, 'Unexpected number of targets');
    expect(newTarget[0].id).toBe(25, 'Unexpected id');
    expect(newTarget[0].name).toBe(target.name, 'Unexpected name');
  }));

});
