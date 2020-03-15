import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  @Input() control: FormControl;

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
