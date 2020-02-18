import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeDeleteComponent } from './telescope-delete.component';

describe('TelescopeDeleteComponent', () => {
  let component: TelescopeDeleteComponent;
  let fixture: ComponentFixture<TelescopeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
