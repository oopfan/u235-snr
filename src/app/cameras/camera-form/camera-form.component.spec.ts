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
