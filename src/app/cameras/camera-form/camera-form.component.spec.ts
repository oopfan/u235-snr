import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraFormComponent } from './camera-form.component';
import { By } from '@angular/platform-browser';
import { ControlsModule } from '../../controls/controls.module';
import { CameraParsed } from 'src/app/services/user-camera.service';

describe('CameraFormComponent', () => {
  let component: CameraFormComponent;
  let fixture: ComponentFixture<CameraFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ControlsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ CameraFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraFormComponent);
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
    expect(component.cameraForm.controls.name.valid).toBeFalsy('Unexpected validation - check 1');
    expect(component.cameraForm.controls.name.errors).not.toBeNull('Unexpected validation - check 2');
    expect(component.cameraForm.controls.name.errors.required).toBeTruthy('Unexpected validation - check 3');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(5, 'Unexpected validation - check 4');
    const input = inputs[0].nativeElement;

    // Put in one character
    input.value = 'X';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.name.valid).toBeTruthy('Unexpected validation - check 5');
    expect(component.cameraForm.controls.name.errors).toBeNull('Unexpected validation - check 6');

    // Remove the character
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be 'required'
    expect(component.cameraForm.controls.name.valid).toBeFalsy('Unexpected validation - check 7');
    expect(component.cameraForm.controls.name.errors).not.toBeNull('Unexpected validation - check 8');
    expect(component.cameraForm.controls.name.errors.required).toBeTruthy('Unexpected validation - check 9');
  });

  it('should exercise validators on pixelSize', () => {
    expect(component).toBeTruthy();

    // Initial state should be invalid
    expect(component.cameraForm.controls.pixelSize.valid).toBeFalsy('Unexpected validation - check 1');
    expect(component.cameraForm.controls.pixelSize.errors).not.toBeNull('Unexpected validation - check 2');
    expect(component.cameraForm.controls.pixelSize.errors.required).toBeTruthy('Unexpected validation - check 3');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(5, 'Unexpected validation - check 4');
    const input = inputs[1].nativeElement;

    // Put in minimum value
    input.value = 0.01;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.pixelSize.valid).toBeTruthy('Unexpected validation - check 5');
    expect(component.cameraForm.controls.pixelSize.errors).toBeNull('Unexpected validation - check 6');

    // Put in less than minimum value
    input.value = 0.009;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.pixelSize.valid).toBeFalsy('Unexpected validation - check 7');
    expect(component.cameraForm.controls.pixelSize.errors).not.toBeNull('Unexpected validation - check 8');
    expect(component.cameraForm.controls.pixelSize.errors.min).toBeTruthy('Unexpected validation - check 9');

    // Put in a large value
    input.value = 999;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.pixelSize.valid).toBeTruthy('Unexpected validation - check 10');
    expect(component.cameraForm.controls.pixelSize.errors).toBeNull('Unexpected validation - check 11');

    // Put in alpha
    input.value = 'FAB1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.pixelSize.valid).toBeFalsy('Unexpected validation - check 12');
    expect(component.cameraForm.controls.pixelSize.errors).not.toBeNull('Unexpected validation - check 13');
    expect(component.cameraForm.controls.pixelSize.errors.required).toBeTruthy('Unexpected validation - check 14');
  });

  it('should exercise validators on readNoise', () => {
    expect(component).toBeTruthy();

    // Initial state should be invalid
    expect(component.cameraForm.controls.readNoise.valid).toBeFalsy('Unexpected validation - check 1');
    expect(component.cameraForm.controls.readNoise.errors).not.toBeNull('Unexpected validation - check 2');
    expect(component.cameraForm.controls.readNoise.errors.required).toBeTruthy('Unexpected validation - check 3');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(5, 'Unexpected validation - check 4');
    const input = inputs[2].nativeElement;

    // Put in minimum value
    input.value = 0;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.readNoise.valid).toBeTruthy('Unexpected validation - check 5');
    expect(component.cameraForm.controls.readNoise.errors).toBeNull('Unexpected validation - check 6');

    // Put in less than minimum value
    input.value = -0.1;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.readNoise.valid).toBeFalsy('Unexpected validation - check 7');
    expect(component.cameraForm.controls.readNoise.errors).not.toBeNull('Unexpected validation - check 8');
    expect(component.cameraForm.controls.readNoise.errors.min).toBeTruthy('Unexpected validation - check 9');

    // Put in a large value
    input.value = 999;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.readNoise.valid).toBeTruthy('Unexpected validation - check 10');
    expect(component.cameraForm.controls.readNoise.errors).toBeNull('Unexpected validation - check 11');

    // Put in alpha
    input.value = 'FAB1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.readNoise.valid).toBeFalsy('Unexpected validation - check 12');
    expect(component.cameraForm.controls.readNoise.errors).not.toBeNull('Unexpected validation - check 13');
    expect(component.cameraForm.controls.readNoise.errors.required).toBeTruthy('Unexpected validation - check 14');
  });

  it('should exercise validators on darkCurrent', () => {
    expect(component).toBeTruthy();

    // Initial state should be invalid
    expect(component.cameraForm.controls.darkCurrent.valid).toBeFalsy('Unexpected validation - check 1');
    expect(component.cameraForm.controls.darkCurrent.errors).not.toBeNull('Unexpected validation - check 2');
    expect(component.cameraForm.controls.darkCurrent.errors.required).toBeTruthy('Unexpected validation - check 3');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(5, 'Unexpected validation - check 4');
    const input = inputs[3].nativeElement;

    // Put in minimum value
    input.value = 0;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.darkCurrent.valid).toBeTruthy('Unexpected validation - check 5');
    expect(component.cameraForm.controls.darkCurrent.errors).toBeNull('Unexpected validation - check 6');

    // Put in less than minimum value
    input.value = -0.01;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.darkCurrent.valid).toBeFalsy('Unexpected validation - check 7');
    expect(component.cameraForm.controls.darkCurrent.errors).not.toBeNull('Unexpected validation - check 8');
    expect(component.cameraForm.controls.darkCurrent.errors.min).toBeTruthy('Unexpected validation - check 9');

    // Put in a large value
    input.value = 123;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.darkCurrent.valid).toBeTruthy('Unexpected validation - check 10');
    expect(component.cameraForm.controls.darkCurrent.errors).toBeNull('Unexpected validation - check 11');

    // Put in alpha
    input.value = '28 FOO';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.darkCurrent.valid).toBeFalsy('Unexpected validation - check 12');
    expect(component.cameraForm.controls.darkCurrent.errors).not.toBeNull('Unexpected validation - check 13');
    expect(component.cameraForm.controls.darkCurrent.errors.required).toBeTruthy('Unexpected validation - check 14');
  });

  it('should exercise validators on quantumEfficiency', () => {
    expect(component).toBeTruthy();

    // Initial state should be invalid
    expect(component.cameraForm.controls.quantumEfficiency.valid).toBeFalsy('Unexpected validation - check 1');
    expect(component.cameraForm.controls.quantumEfficiency.errors).not.toBeNull('Unexpected validation - check 2');
    expect(component.cameraForm.controls.quantumEfficiency.errors.required).toBeTruthy('Unexpected validation - check 3');

    // Get the native input control
    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(5, 'Unexpected validation - check 4');
    const input = inputs[4].nativeElement;

    // Put in minimum value
    input.value = 0;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.quantumEfficiency.valid).toBeTruthy('Unexpected validation - check 5');
    expect(component.cameraForm.controls.quantumEfficiency.errors).toBeNull('Unexpected validation - check 6');

    // Put in less than minimum value
    input.value = -1;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.quantumEfficiency.valid).toBeFalsy('Unexpected validation - check 7');
    expect(component.cameraForm.controls.quantumEfficiency.errors).not.toBeNull('Unexpected validation - check 8');
    expect(component.cameraForm.controls.quantumEfficiency.errors.min).toBeTruthy('Unexpected validation - check 9');

    // Put in a large value
    input.value = 100;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be valid
    expect(component.cameraForm.controls.quantumEfficiency.valid).toBeTruthy('Unexpected validation - check 10');
    expect(component.cameraForm.controls.quantumEfficiency.errors).toBeNull('Unexpected validation - check 11');

    // Put in greater than maximum value
    input.value = 101;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.quantumEfficiency.valid).toBeFalsy('Unexpected validation - check 12');
    expect(component.cameraForm.controls.quantumEfficiency.errors).not.toBeNull('Unexpected validation - check 13');
    expect(component.cameraForm.controls.quantumEfficiency.errors.max).toBeTruthy('Unexpected validation - check 14');

    // Put in alpha
    input.value = 'K9';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // State should be invalid
    expect(component.cameraForm.controls.quantumEfficiency.valid).toBeFalsy('Unexpected validation - check 15');
    expect(component.cameraForm.controls.quantumEfficiency.errors).not.toBeNull('Unexpected validation - check 16');
    expect(component.cameraForm.controls.quantumEfficiency.errors.required).toBeTruthy('Unexpected validation - check 17');
  });

  it('should update model', () => {
    expect(component).toBeTruthy();

    const cameraIn: CameraParsed = {
      id: -1,
      name: 'Atik 314E',
      pixelSize: 4.65,
      readNoise: 5.3,
      darkCurrent: 0,
      quantumEfficiency: 43
    };

    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(5, 'Unexpected number of inputs');

    let input = inputs[0].nativeElement;
    input.value = cameraIn.name;
    input.dispatchEvent(new Event('input'));

    input = inputs[1].nativeElement;
    input.value = cameraIn.pixelSize;
    input.dispatchEvent(new Event('input'));

    input = inputs[2].nativeElement;
    input.value = cameraIn.readNoise;
    input.dispatchEvent(new Event('input'));

    input = inputs[3].nativeElement;
    input.value = cameraIn.darkCurrent;
    input.dispatchEvent(new Event('input'));

    input = inputs[4].nativeElement;
    input.value = cameraIn.quantumEfficiency;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.cameraForm.valid).toBeTruthy('Expected form to be valid');

    const cameraOut: CameraParsed = {
      id: -1,
      name: component.cameraForm.get('name').value,
      pixelSize: component.cameraForm.get('pixelSize').value,
      readNoise: component.cameraForm.get('readNoise').value,
      darkCurrent: component.cameraForm.get('darkCurrent').value,
      quantumEfficiency: component.cameraForm.get('quantumEfficiency').value
    };

    expect(cameraOut.name).toBe(cameraIn.name);
    expect(cameraOut.pixelSize).toBe(cameraIn.pixelSize);
    expect(cameraOut.readNoise).toBe(cameraIn.readNoise);
    expect(cameraOut.darkCurrent).toBe(cameraIn.darkCurrent);
    expect(cameraOut.quantumEfficiency).toBe(cameraIn.quantumEfficiency);
  });

});
