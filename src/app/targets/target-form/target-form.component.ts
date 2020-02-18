import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TargetParsed } from 'src/app/services/user-target.service';

@Component({
  selector: 'app-target-form',
  templateUrl: './target-form.component.html',
  styleUrls: ['./target-form.component.css']
})
export class TargetFormComponent implements OnInit {
  @Input() name: string = '';
  @Input() surfaceBrightness: string = '';
  @Output() notifySubmit:EventEmitter<TargetParsed> = new EventEmitter();
  @Output() notifyCancel:EventEmitter<void> = new EventEmitter();
  targetForm: FormGroup = null;

  constructor() { }

  ngOnInit() {
    this.targetForm = new FormGroup({
      name: new FormControl(this.name, [ Validators.required ]),
      surfaceBrightness: new FormControl(this.surfaceBrightness, [ Validators.required ])
    });
  }

  onSubmit() {
    this.notifySubmit.emit({
      id: -1,
      name: this.targetForm.get('name').value,
      surfaceBrightness: this.targetForm.get('surfaceBrightness').value
    });
  }

  onCancel() {
    this.notifyCancel.emit();
  }

}
