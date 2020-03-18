import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightAscensionComponent } from './right-ascension.component';

describe('RightAscensionComponent', () => {
  let component: RightAscensionComponent;
  let fixture: ComponentFixture<RightAscensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightAscensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightAscensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
