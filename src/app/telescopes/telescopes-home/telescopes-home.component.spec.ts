import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TelescopesHomeComponent } from './telescopes-home.component';
import { UserTelescopeService } from '../../services/user-telescope.service';
import { LocalStorageService } from 'angular-web-storage';

describe('TelescopesHomeComponent', () => {
  let component: TelescopesHomeComponent;
  let fixture: ComponentFixture<TelescopesHomeComponent>;
  let el: DebugElement;
  let storageSpy: any;
  const storageData = {
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

  beforeEach(async(() => {
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TelescopesHomeComponent ],
      providers: [
        UserTelescopeService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopesHomeComponent);
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
    component.telescopes = [];
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
