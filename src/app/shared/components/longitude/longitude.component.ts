import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-longitude',
  templateUrl: './longitude.component.html',
  styleUrls: ['./longitude.component.css']
})
export class LongitudeComponent implements OnInit {
  @Input() decodedAngle = [1, 0, 0, 0, 0];
  degrees = '';
  minutes = '';
  seconds = '';
  microseconds = '';
  eastwest = '';

  constructor() { }

  ngOnInit() {
    this.degrees = this.decodedAngle[1].toFixed(0);

    let temp = '0' + this.decodedAngle[2].toFixed(0);
    this.minutes = temp.slice(temp.length - 2);

    temp = '0' + this.decodedAngle[3].toFixed(0);
    this.seconds = temp.slice(temp.length - 2);

    this.eastwest = this.decodedAngle[0] > 0 ? 'E' : 'W';
  }

}
