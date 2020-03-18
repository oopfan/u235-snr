import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-latitude',
  templateUrl: './latitude.component.html',
  styleUrls: ['./latitude.component.css']
})
export class LatitudeComponent implements OnInit {
  @Input() decodedAngle = [1, 0, 0, 0, 0];
  degrees = '';
  minutes = '';
  seconds = '';
  microseconds = '';
  northsouth = '';

  constructor() { }

  ngOnInit() {
    this.degrees = this.decodedAngle[1].toFixed(0);

    let temp = '0' + this.decodedAngle[2].toFixed(0);
    this.minutes = temp.slice(temp.length - 2);

    temp = '0' + this.decodedAngle[3].toFixed(0);
    this.seconds = temp.slice(temp.length - 2);

    this.northsouth = this.decodedAngle[0] > 0 ? 'N' : 'S';
  }

}
