import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { TargetsModule } from '../targets.module';
import { routes } from '../targets-routing.module';
import { TargetEditComponent } from './target-edit.component';
import { UserTargetService, TargetParsed } from '../../services/user-target.service';
import { LocalStorageService } from 'angular-web-storage';

describe('TargetEditComponent', () => {
  let component: TargetEditComponent;
  let fixture: ComponentFixture<TargetEditComponent>;
  let el: DebugElement;
  let route: ActivatedRoute;
  let location: Location;
  let userTargetService: UserTargetService;
  let storageSpy: any;
  let storageData: any;

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

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        TargetsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        UserTargetService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    })
    .compileComponents();
  }));

  function create(id: string) {
    route = TestBed.get(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(id);
    location = TestBed.get(Location);
    userTargetService = TestBed.get(UserTargetService);
    fixture = TestBed.createComponent(TargetEditComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }

  it('should create', () => {
    create('-1');
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const target: TargetParsed = {
      id: 24,
      name: "My Galaxy",
      surfaceBrightness: 22.2
    };
    create(target.id.toFixed(0));
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const allBefore = userTargetService.getAll();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
    fixture.ngZone.run(() => {
      component.onSubmit(target);
    });
    tick();
    const allAfter = userTargetService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(1);
    expect(allAfter.length - allBefore.length).toBe(0, 'Unexpected change in number of targets');

    const updatedTarget = userTargetService.getItem(target.id);
    expect(updatedTarget).toBeTruthy();
    expect(updatedTarget.length).toBe(1, 'Unexpected number of targets');
    expect(updatedTarget[0].id).toBe(target.id, 'Unexpected id');
    expect(updatedTarget[0].name).toBe(target.name, 'Unexpected name');
  }));

  it('should cancel', fakeAsync(() => {
    create('2');
    expect(component).toBeTruthy();
    expect(storageSpy.get).toHaveBeenCalledTimes(1);

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.pageTitle, 'Unexpected page title');

    const allBefore = userTargetService.getAll();
    fixture.ngZone.run(() => {
      component.onCancel();
    });
    tick();
    const allAfter = userTargetService.getAll();

    expect(location.path()).toBe(component.navigateToUrl, 'Unexpected URL');
    expect(storageSpy.set).toHaveBeenCalledTimes(0);
    expect(allAfter.length - allBefore.length).toBe(0, 'Unexpected change in number of targets');
  }));

  it('should display Target Not Found', fakeAsync(() => {
    create('7');
    expect(component).toBeTruthy();

    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
    expect(titles[0].nativeElement.textContent).toBe(component.notFound, 'Unexpected Message');
  }));

});
