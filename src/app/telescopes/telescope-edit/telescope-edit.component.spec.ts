import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeEditComponent } from './telescope-edit.component';

describe('TelescopeEditComponent', () => {
  let component: TelescopeEditComponent;
  let fixture: ComponentFixture<TelescopeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
