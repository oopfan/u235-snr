import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-surface-brightness-calculator',
  templateUrl: './surface-brightness-calculator.component.html',
  styleUrls: ['./surface-brightness-calculator.component.css']
})
export class SurfaceBrightnessCalculatorComponent implements OnInit {
  @Output() notifySurfaceBrightness:EventEmitter<number> = new EventEmitter();
  magnitude = '';
  majorAxis = '';
  minorAxis = '';
  surfaceBrightness = '';

  onChangeMagnitude(value: string) {
    this.magnitude = value;
    this.calculateSurfaceBrightness();
  }

  onChangeMajorAxis(value: string) {
    this.majorAxis = value;
    this.calculateSurfaceBrightness();
  }

  onChangeMinorAxis(value: string) {
    this.minorAxis = value;
    this.calculateSurfaceBrightness();
  }

  calculateSurfaceBrightness() {
    const sb = parseFloat(this.magnitude) + 2.5 * Math.log10(900 * Math.PI * parseFloat(this.majorAxis) * parseFloat(this.minorAxis));
    this.surfaceBrightness = !isNaN(sb) ? sb.toFixed(1) : '';
    this.notifySurfaceBrightness.emit(sb);
  }

  constructor() {}

  ngOnInit() {
    this.calculateSurfaceBrightness();
  }

}
