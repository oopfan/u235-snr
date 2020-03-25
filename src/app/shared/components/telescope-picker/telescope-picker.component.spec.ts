import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopePickerComponent } from './telescope-picker.component';

describe('TelescopePickerComponent', () => {
  let component: TelescopePickerComponent;
  let fixture: ComponentFixture<TelescopePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
