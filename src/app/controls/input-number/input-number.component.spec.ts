import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputNumberComponent } from './input-number.component';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

describe('InputNumberComponent', () => {
  const testLabel = 'Label';
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ InputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.label = testLabel;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display label', () => {
    expect(component).toBeTruthy();
    const label = el.query(By.css('.label')).nativeElement;
    expect(label.textContent).toBe(testLabel, 'Unexpected label');
  });

  it('should exercise validator: required', () => {
    expect(component).toBeTruthy();

    component.control = new FormControl('123', [ Validators.required ]);
    fixture.detectChanges();

    // State should be valid
    expectValid();

    component.control = new FormControl('', [ Validators.required ]);
    fixture.detectChanges();

    // State should be invalid
    expectInvalid();
    expectRequired();

    // Set a valid input
    const inputElement = getDebugElement();
    setElementValue(inputElement, 123);

    // State should be valid
    expectValid();
  });

  it('should exercise validator: min', () => {
    expect(component).toBeTruthy();

    component.control = new FormControl(1, [ Validators.min(1) ]);
    fixture.detectChanges();

    // State should be valid
    expectValid();

    component.control = new FormControl(0, [ Validators.min(1) ]);
    fixture.detectChanges();

    // State should be invalid
    expectInvalid();
    expectMinimum();

    // Set a valid input
    const inputElement = getDebugElement();
    setElementValue(inputElement, 1);

    // State should be valid
    expectValid();
  });

  it('should exercise validator: max', () => {
    expect(component).toBeTruthy();

    component.control = new FormControl(100, [ Validators.max(100) ]);
    fixture.detectChanges();

    // State should be valid
    expectValid();

    component.control = new FormControl(101, [ Validators.max(100) ]);
    fixture.detectChanges();

    // State should be invalid
    expectInvalid();
    expectMaximum();

    // Set a valid input
    const inputElement = getDebugElement();
    setElementValue(inputElement, 100);

    // State should be valid
    expectValid();
  });

  it ('should update model', () => {
    expect(component).toBeTruthy();

    component.control = new FormControl();
    fixture.detectChanges();

    checkModel(null);

    component.control = new FormControl('');
    fixture.detectChanges();

    checkModel('');

    const inputElement = getDebugElement();
    setElementValue(inputElement, 47725);

    checkModel(47725);
  });

  function getDebugElement(): DebugElement {
    const elements = el.queryAll(By.css('.input'));
    expect(elements).toBeTruthy('Can not find debug element');
    expect(elements.length).toBe(1, 'Expected one debug element');
    return elements[0];
  }

  function setElementValue(debugElement: DebugElement, value: number) {
    debugElement.nativeElement.value = value;
    debugElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function checkModel(value: any) {
    expect(component.control.value).toBe(value);
  }

  function expectInvalid() {
    expect(component.control.valid).toBeFalsy('Expected to be invalid');
    expect(component.control.errors).not.toBeNull('Expected validation errors');
  }

  function expectValid() {
    expect(component.control.valid).toBeTruthy('Expected to be valid');
    expect(component.control.errors).toBeNull('Expected no validation errors');
  }

  function expectRequired() {
    expect(component.control.errors.required).toBeTruthy('Expected required error');
  }

  function expectMinimum() {
    expect(component.control.errors.min).toBeTruthy('Expected min error');
  }

  function expectMaximum() {
    expect(component.control.errors.max).toBeTruthy('Expected max error');
  }

});
