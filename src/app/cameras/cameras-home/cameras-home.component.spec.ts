import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerasHomeComponent } from './cameras-home.component';

describe('CamerasHomeComponent', () => {
  let component: CamerasHomeComponent;
  let fixture: ComponentFixture<CamerasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamerasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamerasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
