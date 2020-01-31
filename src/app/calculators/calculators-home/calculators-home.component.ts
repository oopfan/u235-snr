import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculators-home',
  templateUrl: './calculators-home.component.html',
  styleUrls: ['./calculators-home.component.css']
})
export class CalculatorsHomeComponent implements OnInit {
  calcChoice = '';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Calculators | U235+SNR');
  }

  onChange(value: string) {
    this.calcChoice = value;
  }
}
