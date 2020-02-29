import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ InputTextComponent ],
      //imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    expect(component).toBeTruthy();
    const testLabel = 'My Label';
    component.label = testLabel;
    fixture.detectChanges();
    const label = el.query(By.css('.label'));
    expect(label).toBeTruthy('Could not find label');
    expect(label.nativeElement.textContent).toBe(testLabel, 'Unexpected label');
  });

  xit('should display input', () => {
    expect(component).toBeTruthy();
    component.control = new FormControl('poo');
    expect(component.control.value).toBe('poo', 'foo');
  
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Aubrey';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.control.value).toBe('Aubrey');
  });

});
