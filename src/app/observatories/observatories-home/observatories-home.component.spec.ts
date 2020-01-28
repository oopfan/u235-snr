import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoriesHomeComponent } from './observatories-home.component';

describe('ObservatoriesHomeComponent', () => {
  let component: ObservatoriesHomeComponent;
  let fixture: ComponentFixture<ObservatoriesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoriesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
