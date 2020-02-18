import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TelescopeValidator } from '../../validators/telescope-validator';
import { TelescopeParsed } from 'src/app/services/user-telescope.service';

@Component({
  selector: 'app-telescope-form',
  templateUrl: './telescope-form.component.html',
  styleUrls: ['./telescope-form.component.css']
})
export class TelescopeFormComponent implements OnInit {
  @Output() notifySubmit:EventEmitter<TelescopeParsed> = new EventEmitter();
  @Output() notifyCancel:EventEmitter<string> = new EventEmitter();

  telescopeForm = new FormGroup({
    name: new FormControl('', [ Validators.required ]),
    aperture: new FormControl('', [ Validators.required, Validators.min(1) ]),
    focalLength: new FormControl('', [ Validators.required, Validators.min(1) ]),
    centralObstruction: new FormControl('', [ Validators.required, Validators.min(0) ]),
    totalReflectanceTransmittance: new FormControl('', [ Validators.required, Validators.min(0), Validators.max(1) ])
  }, [
    TelescopeValidator.apertureCheck
  ]);

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.notifySubmit.emit({
      id: -1,
      name: this.telescopeForm.get('name').value,
      aperture: this.telescopeForm.get('aperture').value,
      focalLength: this.telescopeForm.get('focalLength').value,
      centralObstruction: this.telescopeForm.get('centralObstruction').value,
      totalReflectanceTransmittance: this.telescopeForm.get('totalReflectanceTransmittance').value
    });
  }

  onCancel() {
    this.notifyCancel.emit('cancel');
  }

}
