import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-fc',
  templateUrl: './calculator-fc.component.html',
  styleUrls: ['./calculator-fc.component.css']
})
export class CalculatorFcComponent implements OnInit {

  signalToNoiseRatio = '25';
  singleSubExposure = '120';
  totalIntegrationTime = '5';
  frameCount = '100';

  constructor() { }

  ngOnInit() {
  }

  onChangeSignalToNoiseRatio(value: string) {
    this.signalToNoiseRatio = value;
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
  }

}
