import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxHomeComponent } from './sandbox-home.component';

describe('SandboxHomeComponent', () => {
  let component: SandboxHomeComponent;
  let fixture: ComponentFixture<SandboxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
