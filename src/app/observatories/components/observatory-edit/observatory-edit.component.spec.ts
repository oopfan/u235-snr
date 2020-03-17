import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { ObservatoriesModule } from '../../observatories.module';
import { routes } from '../../observatories-routing.module';
import { ObservatoryEditComponent } from './observatory-edit.component';
import { UserObservatoryService, ObservatoryParsed } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('ObservatoryEditComponent', () => {
  let component: ObservatoryEditComponent;
  let fixture: ComponentFixture<ObservatoryEditComponent>;
  let el: DebugElement;
  let route: ActivatedRoute;
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

  function create(id: string) {
    route = TestBed.get(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(id);
    location = TestBed.get(Location);
    userObservatoryService = TestBed.get(UserObservatoryService);
    fixture = TestBed.createComponent(ObservatoryEditComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }

  it('should create', () => {
    create('-1');
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const observatory: ObservatoryParsed = {
      id: 4,
      name: 'Bortle 99',
      bortleClass: '99',
      skyBrightness: 99.99,
      latitude: 0,
      longitude: 0
    };
    create(observatory.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const observatoryListBefore = userObservatoryService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      component.onSubmit(observatory);
    });
    tick();
    const observatoryListAfter = userObservatoryService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    expect(observatoryListAfter.length - observatoryListBefore.length).toBe(0, 'Unexpected change in number of observatories');

    const updatedObservatory = userObservatoryService.getItem(observatory.id);
    expect(updatedObservatory).toBeTruthy();
    expect(updatedObservatory.length).toBe(1, 'Unexpected number of observatories');
    expect(updatedObservatory[0].id).toBe(observatory.id, 'Unexpected id');
    expect(updatedObservatory[0].name).toBe(observatory.name, 'Unexpected name');
  }));

  it('should cancel', fakeAsync(() => {
    create('1');
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const observatoryListBefore = userObservatoryService.getAll();
    fixture.ngZone.run(() => {
      component.onCancel();
    });
    tick();
    const observatoryListAfter = userObservatoryService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(0);
    expect(observatoryListAfter.length - observatoryListBefore.length).toBe(0, 'Unexpected change in number of observatories');
  }));

  it('should display Observatory Not Found', fakeAsync(() => {
    create('21');
    expect(component).toBeTruthy();

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.observatoryNotFound, 'Unexpected Message');
  }));

});
