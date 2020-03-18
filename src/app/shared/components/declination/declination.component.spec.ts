import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinationComponent } from './declination.component';

describe('DeclinationComponent', () => {
  let component: DeclinationComponent;
  let fixture: ComponentFixture<DeclinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
