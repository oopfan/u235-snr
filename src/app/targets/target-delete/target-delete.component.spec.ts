import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDeleteComponent } from './target-delete.component';

describe('TargetDeleteComponent', () => {
  let component: TargetDeleteComponent;
  let fixture: ComponentFixture<TargetDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
