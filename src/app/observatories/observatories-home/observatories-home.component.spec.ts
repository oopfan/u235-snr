import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ObservatoriesHomeComponent } from './observatories-home.component';
import { UserObservatoryService, ObservatoryStored } from '../../services/user-observatory.service';
import { LocalStorageService } from 'angular-web-storage';

describe('ObservatoriesHomeComponent', () => {
  let component: ObservatoriesHomeComponent;
  let fixture: ComponentFixture<ObservatoriesHomeComponent>;
  let el: DebugElement;
  let storageSpy: any;
  const storageData = {
    list: [
      {
        id: 4,
        name: 'Bortle 6',
        bortleClass: '6',
        skyBrightness: '19.23'
      },
      {
        id: 1,
        name: 'Bortle 4',
        bortleClass: '4',
        skyBrightness: '21.51'
      }
    ],
    nextid: 5
  };

  beforeEach(async(() => {
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue(storageData);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ObservatoriesHomeComponent ],
      providers: [
        UserObservatoryService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoriesHomeComponent);
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
