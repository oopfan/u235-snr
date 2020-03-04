import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservatoryFormComponent } from './observatory-form.component';
import { By } from '@angular/platform-browser';
import { ControlsModule } from '../../controls/controls.module';
import { ObservatoryParsed } from 'src/app/services/user-observatory.service';

describe('ObservatoryFormComponent', () => {
  let component: ObservatoryFormComponent;
  let fixture: ComponentFixture<ObservatoryFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ControlsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ ObservatoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exercise validators on name', () => {
    expect(component).toBeTruthy();

    // Initial state should be 'required'
    expect(component.observatoryForm.controls.name.valid).toBeFalsy('Unexpected validation - check 1');
    expect(component.observatoryForm.controls.name.errors).not.toBeNull('Unexpected validation - check 2');
    expect(component.observatoryForm.controls.name.errors.required).toBeTruthy('Unexpected validation - check 3');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(3, 'Unexpected validation - check 4');
    const input = inputs[0].nativeElement;

    // Put in one character
    input.value = 'X';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.observatoryForm.controls.name.valid).toBeTruthy('Unexpected validation - check 5');
    expect(component.observatoryForm.controls.name.errors).toBeNull('Unexpected validation - check 6');

    // Remove the character
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be 'required'
    expect(component.observatoryForm.controls.name.valid).toBeFalsy('Unexpected validation - check 7');
    expect(component.observatoryForm.controls.name.errors).not.toBeNull('Unexpected validation - check 8');
    expect(component.observatoryForm.controls.name.errors.required).toBeTruthy('Unexpected validation - check 9');
  });

  it('should exercise validators on bortleClass', () => {
    expect(component).toBeTruthy();

    // Initial state should be valid
    expect(component.observatoryForm.controls.bortleClass.valid).toBeTruthy('Unexpected validation - check 1');
    expect(component.observatoryForm.controls.bortleClass.errors).toBeNull('Unexpected validation - check 2');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(3, 'Unexpected validation - check 3');
    const input = inputs[1].nativeElement;

    // Put in one character
    input.value = 'X';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.observatoryForm.controls.bortleClass.valid).toBeTruthy('Unexpected validation - check 4');
    expect(component.observatoryForm.controls.bortleClass.errors).toBeNull('Unexpected validation - check 5');
  });

  it('should exercise validators on skyBrightness', () => {
    expect(component).toBeTruthy();

    // Initial state should be invalid
    expect(component.observatoryForm.controls.skyBrightness.valid).toBeFalsy('Unexpected validation - check 1');
    expect(component.observatoryForm.controls.skyBrightness.errors).not.toBeNull('Unexpected validation - check 2');
    expect(component.observatoryForm.controls.skyBrightness.errors.required).toBeTruthy('Unexpected validation - check 3');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(3, 'Unexpected validation - check 4');
    const input = inputs[2].nativeElement;

    // Put in a negative number
    input.value = -333.1415;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.observatoryForm.controls.skyBrightness.valid).toBeTruthy('Unexpected validation - check 5');
    expect(component.observatoryForm.controls.skyBrightness.errors).toBeNull('Unexpected validation - check 6');

    // Put in a positive number
    input.value = 333.1415;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.observatoryForm.controls.skyBrightness.valid).toBeTruthy('Unexpected validation - check 7');
    expect(component.observatoryForm.controls.skyBrightness.errors).toBeNull('Unexpected validation - check 8');

    // Put in alpha
    input.value = 'FAB1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.observatoryForm.controls.skyBrightness.valid).toBeFalsy('Unexpected validation - check 9');
    expect(component.observatoryForm.controls.skyBrightness.errors).not.toBeNull('Unexpected validation - check 10');
    expect(component.observatoryForm.controls.skyBrightness.errors.required).toBeTruthy('Unexpected validation - check 11');
  });

  it('should update model', () => {
    expect(component).toBeTruthy();

    const observatoryIn: ObservatoryParsed = {
      id: -1,
      name: 'Bortle 5',
      bortleClass: '5',
      skyBrightness: 20.02
    };

    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(3, 'Unexpected number of inputs');

    let input = inputs[0].nativeElement;
    input.value = observatoryIn.name;
    input.dispatchEvent(new Event('input'));

    input = inputs[1].nativeElement;
    input.value = observatoryIn.bortleClass;
    input.dispatchEvent(new Event('input'));

    input = inputs[2].nativeElement;
    input.value = observatoryIn.skyBrightness;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.observatoryForm.valid).toBeTruthy('Expected form to be valid');

    const observatoryOut: ObservatoryParsed = {
      id: -1,
      name: component.observatoryForm.get('name').value,
      bortleClass: component.observatoryForm.get('bortleClass').value,
      skyBrightness: component.observatoryForm.get('skyBrightness').value
    };

    expect(observatoryOut.name).toBe(observatoryIn.name);
    expect(observatoryOut.bortleClass).toBe(observatoryIn.bortleClass);
    expect(observatoryOut.skyBrightness).toBe(observatoryIn.skyBrightness);
  });

});
