import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-declination',
  templateUrl: './declination.component.html',
  styleUrls: ['./declination.component.css']
})
export class DeclinationComponent implements OnInit {
  @Input() decodedAngle = [1, 0, 0, 0, 0];
  degrees = '';
  minutes = '';
  seconds = '';
  microseconds = '';
  plusminus = '';
  
  constructor() { }

  ngOnInit() {
    let temp = '0' + this.decodedAngle[1].toFixed(0);
    this.degrees = temp.slice(temp.length - 2);

    temp = '0' + this.decodedAngle[2].toFixed(0);
    this.minutes = temp.slice(temp.length - 2);

    temp = '0' + this.decodedAngle[3].toFixed(0);
    this.seconds = temp.slice(temp.length - 2);

    this.plusminus = this.decodedAngle[0] > 0 ? '+' : '-';
}

}
