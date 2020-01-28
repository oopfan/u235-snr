import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsHomeComponent } from './targets-home.component';

describe('TargetsHomeComponent', () => {
  let component: TargetsHomeComponent;
  let fixture: ComponentFixture<TargetsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
