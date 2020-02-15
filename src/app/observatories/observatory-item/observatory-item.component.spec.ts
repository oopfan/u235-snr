import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservatoryItemComponent } from './observatory-item.component';

describe('ObservatoryItemComponent', () => {
  let component: ObservatoryItemComponent;
  let fixture: ComponentFixture<ObservatoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
