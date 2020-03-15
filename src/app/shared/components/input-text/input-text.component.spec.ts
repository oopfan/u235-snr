import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ InputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exercise validator: required', () => {
    expect(component).toBeTruthy();

    component.control = new FormControl('X', [ Validators.required ]);
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
    setElementValue(inputElement, 'X');

    // State should be valid
    expectValid();
  });

  it('should exercise validator: minLength', () => {
    expect(component).toBeTruthy();

    component.control = new FormControl('ABCDE', [ Validators.minLength(5) ]);
    fixture.detectChanges();

    // State should be valid
    expectValid();

    component.control = new FormControl('ABCD', [ Validators.minLength(5) ]);
    fixture.detectChanges();

    // State should be invalid
    expectInvalid();
    expectMinimumLength();

    // Set a valid input
    const inputElement = getDebugElement();
    setElementValue(inputElement, 'ABCDE');

    // State should be valid
    expectValid();
  });

  it('should exercise validator: maxLength', () => {
    expect(component).toBeTruthy();

    component.control = new FormControl('ABCDE', [ Validators.maxLength(5) ]);
    fixture.detectChanges();

    // State should be valid
    expectValid();

    component.control = new FormControl('ABCDEF', [ Validators.maxLength(5) ]);
    fixture.detectChanges();

    // State should be invalid
    expectInvalid();
    expectMaximumLength();

    // Set a valid input
    const inputElement = getDebugElement();
    setElementValue(inputElement, 'ABCDE');

    // State should be valid
    expectValid();
  });

  // Beware: using string pattern doesn't validate as expected, must use regular expressions.
  it('should exercise validator: pattern', () => {
    expect(component).toBeTruthy();

    const pattern = /^[1-9]\d*$/;
    component.control = new FormControl('1957', [ Validators.pattern(pattern) ]);
    fixture.detectChanges();

    // State should be valid
    expectValid();

    component.control = new FormControl(' 1957', [ Validators.pattern(pattern) ]);
    fixture.detectChanges();

    // State should be invalid
    expectInvalid();
    expectPattern();

    // Set a valid input
    const inputElement = getDebugElement();
    setElementValue(inputElement, '2020');

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

    const pwd = 'DSc0BEOMoz%gogZ#kBSo';
    const inputElement = getDebugElement();
    setElementValue(inputElement, pwd);

    checkModel(pwd);
  });

  function getDebugElement(): DebugElement {
    const elements = el.queryAll(By.css('.input'));
    expect(elements).toBeTruthy('Can not find debug element');
    expect(elements.length).toBe(1, 'Expected one debug element');
    return elements[0];
  }

  function setElementValue(debugElement: DebugElement, value: string) {
    debugElement.nativeElement.value = value;
    debugElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function checkModel(value: string) {
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

  function expectMinimumLength() {
    expect(component.control.errors.minlength).toBeTruthy('Expected minlength error');
  }

  function expectMaximumLength() {
    expect(component.control.errors.maxlength).toBeTruthy('Expected maxlength error');
  }

  function expectPattern() {
    expect(component.control.errors.pattern).toBeTruthy('Expected pattern error');
  }

});
