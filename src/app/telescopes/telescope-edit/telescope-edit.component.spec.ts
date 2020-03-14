import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { TelescopesModule } from '../telescopes.module';
import { routes } from '../telescopes-routing.module';
import { TelescopeEditComponent } from './telescope-edit.component';
import { UserTelescopeService, TelescopeParsed } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('TelescopeEditComponent', () => {
  let component: TelescopeEditComponent;
  let fixture: ComponentFixture<TelescopeEditComponent>;
  let el: DebugElement;
  let route: ActivatedRoute;
  let location: Location;
  let userTelescopeService: UserTelescopeService;
  let storageSpy: any;
  let storageData: any;

  beforeEach(async(() => {
    storageData = {
      list: [
        {
          id: 3,
          name: 'William Optics ZenithStar 71',
          aperture: '71',
          focalLength: '418',
          centralObstruction: '0',
          totalReflectanceTransmittance: '0.99'
        },
        {
          id: 7,
          name: 'Ascension 127mm f/7.5',
          aperture: '127',
          focalLength: '952.5',
          centralObstruction: '0',
          totalReflectanceTransmittance: '0.99'
        }
      ],
      nextid: 8
    };
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        TelescopesModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        UserTelescopeService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    })
    .compileComponents();
  }));

  function create(id: string) {
    route = TestBed.get(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(id);
    location = TestBed.get(Location);
    userTelescopeService = TestBed.get(UserTelescopeService);
    fixture = TestBed.createComponent(TelescopeEditComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }

  it('should create', () => {
    create('-1');
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const telescope: TelescopeParsed = {
      id: 3,
      name: 'My Telescope',
      aperture: 123,
      focalLength: 314,
      centralObstruction: 10,
      totalReflectanceTransmittance: 0.97
    };
    create(telescope.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const allBefore = userTelescopeService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      component.onSubmit(telescope);
    });
    tick();
    const allAfter = userTelescopeService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    expect(allAfter.length - allBefore.length).toBe(0, 'Unexpected change in number of telescopes');

    const updatedTelescope = userTelescopeService.getItem(telescope.id);
    expect(updatedTelescope).toBeTruthy();
    expect(updatedTelescope.length).toBe(1, 'Unexpected number of telescopes');
    expect(updatedTelescope[0].id).toBe(telescope.id, 'Unexpected id');
    expect(updatedTelescope[0].name).toBe(telescope.name, 'Unexpected name');
  }));

  it('should cancel', fakeAsync(() => {
    create('3');
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const allBefore = userTelescopeService.getAll();
    fixture.ngZone.run(() => {
      component.onCancel();
    });
    tick();
    const allAfter = userTelescopeService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(0);
    expect(allAfter.length - allBefore.length).toBe(0, 'Unexpected change in number of telescopes');
  }));

  it('should display Telescope Not Found', fakeAsync(() => {
    create('21');
    expect(component).toBeTruthy();

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.notFound, 'Unexpected Message');
  }));

});
