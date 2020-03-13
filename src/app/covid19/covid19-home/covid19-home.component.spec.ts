import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19HomeComponent } from './covid19-home.component';

describe('Covid19HomeComponent', () => {
  let component: Covid19HomeComponent;
  let fixture: ComponentFixture<Covid19HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Covid19HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
