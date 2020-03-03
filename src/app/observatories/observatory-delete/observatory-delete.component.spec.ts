import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { ObservatoriesModule } from '../observatories.module';
import { routes } from '../observatories-routing.module';
import { ObservatoryDeleteComponent } from './observatory-delete.component';
import { UserObservatoryService } from '../../services/user-observatory.service';
import { LocalStorageService } from 'angular-web-storage';

describe('ObservatoryDeleteComponent', () => {
  let component: ObservatoryDeleteComponent;
  let fixture: ComponentFixture<ObservatoryDeleteComponent>;
  let el: DebugElement;
  let route: ActivatedRoute;
  let location: Location;
  let userObservatoryService: UserObservatoryService;
  let storageSpy: any;
  const storageData = {
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

  beforeEach(async(() => {
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ObservatoriesModule
      ],
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
    fixture = TestBed.createComponent(ObservatoryDeleteComponent);
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
    const observatory = storageData.list[index];
    create(observatory.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const name = el.query(By.css('#name'));
    expect(name).toBeTruthy('Could not find name');
    expect(name.nativeElement.textContent).toBe(observatory.name, 'Unexpected name');

    const bortleClass = el.query(By.css('#bortle-class'));
    expect(bortleClass).toBeTruthy('Could not find bortleClass');
    expect(bortleClass.nativeElement.textContent).toBe(observatory.bortleClass, 'Unexpected bortleClass');

    const skyBrightness = el.query(By.css('#sky-brightness'));
    expect(skyBrightness).toBeTruthy('Could not find skyBrightness');
    expect(skyBrightness.nativeElement.textContent).toBe(observatory.skyBrightness, 'Unexpected skyBrightness');

    const btn = el.query(By.css('#submit'));
    expect(btn).toBeTruthy('Could not find submit button');

    const observatoryListBefore = userObservatoryService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      btn.nativeElement.click();
    });
    tick();
    const observatoryListAfter = userObservatoryService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    expect(observatoryListAfter.length - observatoryListBefore.length).toBe(-1, 'Unexpected change in number of observatories');
  }));

  it('should cancel', fakeAsync(() => {
    create('4');
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const btn = el.query(By.css('#cancel'));
    expect(btn).toBeTruthy('Could not find cancel button');

    const observatoryListBefore = userObservatoryService.getAll();
    fixture.ngZone.run(() => {
      btn.nativeElement.click();
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
    expect(titles[0].nativeElement.textContent).toBe(component.notFound, 'Unexpected Message');
  }));

});
