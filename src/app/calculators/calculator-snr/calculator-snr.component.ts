import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-snr',
  templateUrl: './calculator-snr.component.html',
  styleUrls: ['./calculator-snr.component.css']
})
export class CalculatorSnrComponent implements OnInit {

  totalIntegrationTime = '5';
  singleSubExposure = '120';
  signalToNoiseRatio = '25';
  frameCount = "100";

  constructor() { }

  ngOnInit() {
  }

  onChangeTotalIntegrationTime(value: string) {
    this.totalIntegrationTime = value;
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
  }
}
