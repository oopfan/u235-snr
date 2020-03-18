import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-azimuth',
  templateUrl: './azimuth.component.html',
  styleUrls: ['./azimuth.component.css']
})
export class AzimuthComponent implements OnInit, OnChanges {
  @Input() decodedAngle = [1, 0, 0, 0, 0];
  @Output() notifyChange:EventEmitter<void> = new EventEmitter();
  degrees = '';
  minutes = '';

  constructor() { }

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  private update() {
    let temp: string;
    let degrees: string;

    if (this.decodedAngle[1] < 100) {
      temp = '0' + this.decodedAngle[1].toFixed(0);
      degrees = temp.slice(temp.length - 2);
    }
    else {
      temp = this.decodedAngle[1].toFixed(0);
      degrees = temp;
    }

    temp = '0' + this.decodedAngle[2].toFixed(0);
    const minutes = temp.slice(temp.length - 2);

    if (degrees !== this.degrees || minutes !== this.minutes) {
      this.degrees = degrees;
      this.minutes = minutes;
      this.notifyChange.emit();
    }
  }
}
