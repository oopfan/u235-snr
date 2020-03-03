import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { TelescopesModule } from '../telescopes.module';
import { routes } from '../telescopes-routing.module';
import { TelescopeCreateComponent } from './telescope-create.component';
import { UserTelescopeService, TelescopeParsed } from '../../services/user-telescope.service';
import { LocalStorageService } from 'angular-web-storage';

fdescribe('TelescopeCreateComponent', () => {
  let component: TelescopeCreateComponent;
  let fixture: ComponentFixture<TelescopeCreateComponent>;
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

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeCreateComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    userTelescopeService = TestBed.get(UserTelescopeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    expect(component).toBeTruthy();
    const allBefore = userTelescopeService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    const telescope: TelescopeParsed = {
      id: -1,
      name: 'My Telescope',
      aperture: 123,
      focalLength: 314,
      centralObstruction: 10,
      totalReflectanceTransmittance: 0.97
    };
    fixture.ngZone.run(() => {
      component.onSubmit(telescope);
    });
    tick();
    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    const allAfter = userTelescopeService.getAll();
    expect(allAfter.length - allBefore.length).toBe(1, 'Unexpected change in number of telescopes');
    const newTelescope = userTelescopeService.getItem(8);
    expect(newTelescope).toBeTruthy();
    expect(newTelescope.length).toBe(1, 'Unexpected number of telescopes');
    expect(newTelescope[0].id).toBe(8, 'Unexpected id');
    expect(newTelescope[0].name).toBe(telescope.name, 'Unexpected name');
  }));

});
