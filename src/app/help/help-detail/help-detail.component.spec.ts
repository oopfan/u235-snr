import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDetailComponent } from './help-detail.component';

describe('HelpDetailComponent', () => {
  let component: HelpDetailComponent;
  let fixture: ComponentFixture<HelpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
