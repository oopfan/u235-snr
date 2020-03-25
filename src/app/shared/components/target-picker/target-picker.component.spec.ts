import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPickerComponent } from './target-picker.component';

describe('TargetPickerComponent', () => {
  let component: TargetPickerComponent;
  let fixture: ComponentFixture<TargetPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
