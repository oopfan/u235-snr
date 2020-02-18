import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetFormComponent } from './target-form.component';

describe('TargetFormComponent', () => {
  let component: TargetFormComponent;
  let fixture: ComponentFixture<TargetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
