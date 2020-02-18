import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObservatoryParsed } from 'src/app/services/user-observatory.service';

@Component({
  selector: 'app-observatory-form',
  templateUrl: './observatory-form.component.html',
  styleUrls: ['./observatory-form.component.css']
})
export class ObservatoryFormComponent implements OnInit {
  @Input() name: string = '';
  @Input() bortleClass: string = '';
  @Input() skyBrightness: string = '';
  @Output() notifySubmit:EventEmitter<ObservatoryParsed> = new EventEmitter();
  @Output() notifyCancel:EventEmitter<void> = new EventEmitter();
  observatoryForm: FormGroup = null;

  constructor() { }

  ngOnInit() {
    this.observatoryForm = new FormGroup({
      name: new FormControl(this.name, [ Validators.required ]),
      bortleClass: new FormControl(this.bortleClass),
      skyBrightness: new FormControl(this.skyBrightness, [ Validators.required ])
    });
  }

  onSubmit() {
    this.notifySubmit.emit({
      id: -1,
      name: this.observatoryForm.get('name').value,
      bortleClass: this.observatoryForm.get('bortleClass').value,
      skyBrightness: this.observatoryForm.get('skyBrightness').value
    });
  }

  onCancel() {
    this.notifyCancel.emit();
  }

}
