import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CameraParsed } from '@core/services';

@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.css']
})
export class CameraFormComponent implements OnInit {
  @Input() name: string = '';
  @Input() pixelSize: string = '';
  @Input() readNoise: string = '';
  @Input() darkCurrent: string = '';
  @Input() quantumEfficiency: string = '';
  @Output() notifySubmit:EventEmitter<CameraParsed> = new EventEmitter();
  @Output() notifyCancel:EventEmitter<void> = new EventEmitter();
  cameraForm: FormGroup = null;

  constructor() { }

  ngOnInit() {
    this.cameraForm = new FormGroup({
      name: new FormControl(this.name, [ Validators.required ]),
      pixelSize: new FormControl(this.pixelSize, [ Validators.required, Validators.min(0.01) ]),
      readNoise: new FormControl(this.readNoise, [ Validators.required, Validators.min(0) ]),
      darkCurrent: new FormControl(this.darkCurrent, [ Validators.required, Validators.min(0) ]),
      quantumEfficiency: new FormControl(this.quantumEfficiency, [ Validators.required, Validators.min(0), Validators.max(100) ])
    });
  }

  onSubmit() {
    this.notifySubmit.emit({
      id: -1,
      name: this.cameraForm.get('name').value,
      pixelSize: this.cameraForm.get('pixelSize').value,
      readNoise: this.cameraForm.get('readNoise').value,
      darkCurrent: this.cameraForm.get('darkCurrent').value,
      quantumEfficiency: this.cameraForm.get('quantumEfficiency').value
    });
  }

  onCancel() {
    this.notifyCancel.emit();
  }

}
