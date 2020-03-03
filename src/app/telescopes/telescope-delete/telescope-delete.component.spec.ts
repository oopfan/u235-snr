import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { TelescopesModule } from '../telescopes.module';
import { routes } from '../telescopes-routing.module';
import { TelescopeDeleteComponent } from './telescope-delete.component';
import { UserTelescopeService, TelescopeParsed } from '../../services/user-telescope.service';
import { LocalStorageService } from 'angular-web-storage';

describe('TelescopeDeleteComponent', () => {
  let component: TelescopeDeleteComponent;
  let fixture: ComponentFixture<TelescopeDeleteComponent>;
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
    fixture = TestBed.createComponent(TelescopeDeleteComponent);
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
    const telescope = storageData.list[index];
    create(telescope.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const name = el.query(By.css('#name'));
    expect(name).toBeTruthy('Could not find name');
    expect(name.nativeElement.textContent).toBe(telescope.name, 'Unexpected name');

    const aperture = el.query(By.css('#aperture'));
    expect(aperture).toBeTruthy('Could not find aperture');
    expect(aperture.nativeElement.textContent).toBe(telescope.aperture, 'Unexpected aperture');

    const focalLength = el.query(By.css('#focal-length'));
    expect(focalLength).toBeTruthy('Could not find focalLength');
    expect(focalLength.nativeElement.textContent).toBe(telescope.focalLength, 'Unexpected focalLength');

    const centralObstruction = el.query(By.css('#central-obstruction'));
    expect(centralObstruction).toBeTruthy('Could not find centralObstruction');
    expect(centralObstruction.nativeElement.textContent).toBe(telescope.centralObstruction, 'Unexpected centralObstruction');

    const totalReflectanceTransmittance = el.query(By.css('#total-reflectance-transmittance'));
    expect(totalReflectanceTransmittance).toBeTruthy('Could not find totalReflectanceTransmittance');
    expect(totalReflectanceTransmittance.nativeElement.textContent).toBe(telescope.totalReflectanceTransmittance, 'Unexpected totalReflectanceTransmittance');

    const btn = el.query(By.css('#submit'));
    expect(btn).toBeTruthy('Could not find submit button');

    const allBefore = userTelescopeService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      btn.nativeElement.click();
    });
    tick();
    const allAfter = userTelescopeService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    expect(allAfter.length - allBefore.length).toBe(-1, 'Unexpected change in number of telescopes');
  }));

  it('should cancel', fakeAsync(() => {
    const index = 1;
    const telescope = storageData.list[index];
    create(telescope.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const btn = el.query(By.css('#cancel'));
    expect(btn).toBeTruthy('Could not find cancel button');

    const allBefore = userTelescopeService.getAll();
    fixture.ngZone.run(() => {
      btn.nativeElement.click();
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
