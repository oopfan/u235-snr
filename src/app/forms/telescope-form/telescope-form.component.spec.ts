import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeFormComponent } from './telescope-form.component';

describe('TelescopeFormComponent', () => {
  let component: TelescopeFormComponent;
  let fixture: ComponentFixture<TelescopeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
