import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopesHomeComponent } from './telescopes-home.component';

describe('TelescopesHomeComponent', () => {
  let component: TelescopesHomeComponent;
  let fixture: ComponentFixture<TelescopesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
