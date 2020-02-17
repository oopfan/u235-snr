import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() min: string;
  @Input() max: string;
  @Input() step: string;

  constructor() { }

  ngOnInit() {
  }

  showErrors() {
    if (this.control) {
      const { dirty, touched, errors } = this.control;
      return dirty && touched && errors;
    }
    return false;
  }
}
