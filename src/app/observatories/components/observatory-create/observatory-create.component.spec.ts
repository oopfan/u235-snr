import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { ObservatoriesModule } from '../../observatories.module';
import { routes } from '../../observatories-routing.module';
import { ObservatoryCreateComponent } from './observatory-create.component';
import { UserObservatoryService, ObservatoryParsed } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('ObservatoryCreateComponent', () => {
  let component: ObservatoryCreateComponent;
  let fixture: ComponentFixture<ObservatoryCreateComponent>;
  let location: Location;
  let userObservatoryService: UserObservatoryService;
  let storageSpy: any;
  let storageData: any;

  beforeEach(async(() => {
    storageData = {
      list: [
        {
          id: 1,
          name: 'Bortle 4',
          bortleClass: '4',
          skyBrightness: '21.51'
        },
        {
          id: 4,
          name: 'Bortle 6',
          bortleClass: '6',
          skyBrightness: '19.23'
        }
      ],
      nextid: 5
    };
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ObservatoriesModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        UserObservatoryService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryCreateComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    userObservatoryService = TestBed.get(UserObservatoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    expect(component).toBeTruthy();
    const observatoryListBefore = userObservatoryService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    const observatory: ObservatoryParsed = {
      id: -1,
      name: 'Bortle 99',
      bortleClass: '99',
      skyBrightness: 99.99
    };
    fixture.ngZone.run(() => {
      component.onSubmit(observatory);
    });
    tick();
    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    const observatoryListAfter = userObservatoryService.getAll();
    expect(observatoryListAfter.length - observatoryListBefore.length).toBe(1, 'Unexpected change in number of observatories');
    const newObservatory = userObservatoryService.getItem(5);
    expect(newObservatory).toBeTruthy();
    expect(newObservatory.length).toBe(1, 'Unexpected number of observatories');
    expect(newObservatory[0].id).toBe(5, 'Unexpected id');
    expect(newObservatory[0].name).toBe(observatory.name, 'Unexpected name');
  }));

  it('should cancel', fakeAsync(() => {
    expect(component).toBeTruthy();
    const observatoryListBefore = userObservatoryService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      component.onCancel();
    });
    tick();
    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(0);
    const observatoryListAfter = userObservatoryService.getAll();
    expect(observatoryListAfter.length - observatoryListBefore.length).toBe(0, 'Unexpected change in number of observatories');
  }));

});
