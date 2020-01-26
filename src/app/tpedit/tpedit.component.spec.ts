import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpeditComponent } from './tpedit.component';

describe('TpeditComponent', () => {
  let component: TpeditComponent;
  let fixture: ComponentFixture<TpeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
