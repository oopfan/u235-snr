import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeCreateComponent } from './telescope-create.component';

describe('TelescopeCreateComponent', () => {
  let component: TelescopeCreateComponent;
  let fixture: ComponentFixture<TelescopeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
