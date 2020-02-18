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
    // Major and minor axis are arc-minutes. sb is mag per sq arcsec. 900 is the conversion factor.
    // Standard formula is sb = magnitude + 2.5 * log10(pi * major / 2 * minor / 2) if units are kept the same.
    // However in our case sb = magnitude + 2.5 * log10(pi * major * 60 / 2 * minor * 60 / 2).
    // Which is equivalent to sb = magnitude + 2.5 * log10(pi * 30 * 30 * major * minor).
    // sb = magnitude + 2.5 * log10(pi * major / 2 * minor / 2 * 3600)
    // To convert back and forth between arcsec^2 and arcmin^2 then add or subtract 2.5 * log10(3600) = 8.89
    const sb = parseFloat(this.magnitude) + 2.5 * Math.log10(900 * Math.PI * parseFloat(this.majorAxis) * parseFloat(this.minorAxis));
    this.surfaceBrightness = !isNaN(sb) ? sb.toFixed(2) : '';
    this.notifySurfaceBrightness.emit(sb);
  }

  constructor() {}

  ngOnInit() {
    this.calculateSurfaceBrightness();
  }

}
