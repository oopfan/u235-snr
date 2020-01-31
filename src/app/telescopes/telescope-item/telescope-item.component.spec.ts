import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeItemComponent } from './telescope-item.component';

describe('TelescopeItemComponent', () => {
  let component: TelescopeItemComponent;
  let fixture: ComponentFixture<TelescopeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
