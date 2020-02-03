import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsHomeComponent } from './errors-home.component';

describe('ErrorsHomeComponent', () => {
  let component: ErrorsHomeComponent;
  let fixture: ComponentFixture<ErrorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
