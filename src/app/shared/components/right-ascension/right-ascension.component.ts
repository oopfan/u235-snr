import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-ascension',
  templateUrl: './right-ascension.component.html',
  styleUrls: ['./right-ascension.component.css']
})
export class RightAscensionComponent implements OnInit {
  @Input() decodedAngle = [1, 0, 0, 0, 0];
  hours = '';
  minutes = '';
  seconds = '';
  microseconds = '';

  constructor() { }

  ngOnInit() {
    let temp = '0' + this.decodedAngle[1].toFixed(0);
    this.hours = temp.slice(temp.length - 2);

    temp = '0' + this.decodedAngle[2].toFixed(0);
    this.minutes = temp.slice(temp.length - 2);

    temp = '0' + this.decodedAngle[3].toFixed(0);
    this.seconds = temp.slice(temp.length - 2);
  }

}
