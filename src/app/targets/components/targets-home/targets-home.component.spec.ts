import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TargetsHomeComponent } from './targets-home.component';
import { UserTargetService } from '@core/services';
import { LocalStorageService } from 'angular-web-storage';

describe('TargetsHomeComponent', () => {
  let component: TargetsHomeComponent;
  let fixture: ComponentFixture<TargetsHomeComponent>;
  let el: DebugElement;
  let storageSpy: any;
  let storageData: any;

  beforeEach(async(() => {
    storageData = {
      list: [
        {
          id: 2,
          name: "M81 Bode's Galaxy",
          surfaceBrightness: '21.7'
        },
        {
          id: 24,
          name: 'M27 Dumbbell Nebula',
          surfaceBrightness: '20.2'
        }
      ],
      nextid:30
    };
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TargetsHomeComponent ],
      providers: [
        UserTargetService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetsHomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page', () => {
    expect(component).toBeTruthy();
    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
  });

  it('should display the title', () => {
    expect(component).toBeTruthy();
    const title = el.query(By.css('.title:first-child'));
    expect(title).toBeTruthy('Could not find title');
    expect(title.nativeElement.textContent).toBe(component.pageTitle, "Unexpected Page Title");
  });

  it('should display the table', () => {
    expect(component).toBeTruthy();
    const tables = el.queryAll(By.css('.table'));
    expect(tables).toBeTruthy('Could not find table');
    expect(tables.length).toBe(1, 'Unexpected number of tables');
  });

  it('should not display the table', () => {
    expect(component).toBeTruthy();
    component.targets = [];
    fixture.detectChanges();
    const tables = el.queryAll(By.css('.table'));
    expect(tables).toBeTruthy('Could not find table');
    expect(tables.length).toBe(0, 'Unexpected number of tables');
  });

  it('should display the rows', () => {
    expect(component).toBeTruthy();
    const rows = el.queryAll(By.css('tbody tr'));
    expect(rows).toBeTruthy('Could not find rows');
    expect(rows.length).toBe(storageData.list.length, 'Unexpected number of rows');
  });

  it('should display the row name', () => {
    expect(component).toBeTruthy();
    const row = el.query(By.css('tbody tr td:first-child'));
    expect(row).toBeTruthy('Could not find row');
    expect(row.nativeElement.textContent).toBe(storageData.list[1].name, "Unexpected row name"); // see below:
    // It's the second item because the component sorts data on name
  });
});
