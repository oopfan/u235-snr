import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TelescopeValidator } from '../../validators/telescope-validator';

@Component({
  selector: 'app-telescope-form',
  templateUrl: './telescope-form.component.html',
  styleUrls: ['./telescope-form.component.css']
})
export class TelescopeFormComponent implements OnInit {
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
  }

  onReset() {
    this.telescopeForm.reset();
  }

}
