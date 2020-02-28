import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LandingHomeComponent } from './landing-home.component';
import { routes } from '../landing-routing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LandingHomeComponent', () => {
  let component: LandingHomeComponent;
  let fixture: ComponentFixture<LandingHomeComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ LandingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the landing page', () => {
    expect(component).toBeTruthy();
    const titles = el.queryAll(By.css('.title'));
    expect(titles).toBeTruthy('Could not find title');
    expect(titles.length).toBe(1, 'Unexpected number of titles');
  });

  it('should display the title', () => {
    expect(component).toBeTruthy();
    const title = el.query(By.css('.title:first-child'));
    expect(title).toBeTruthy('Could not find title');
    expect(title.nativeElement.textContent).toBe(component.pageTitle, "Unexpected Page Title");
  });
});
