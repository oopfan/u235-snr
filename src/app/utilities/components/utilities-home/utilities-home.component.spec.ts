import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesHomeComponent } from './utilities-home.component';

describe('UtilitiesHomeComponent', () => {
  let component: UtilitiesHomeComponent;
  let fixture: ComponentFixture<UtilitiesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
