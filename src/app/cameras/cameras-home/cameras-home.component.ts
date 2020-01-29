import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cameras-home',
  templateUrl: './cameras-home.component.html',
  styleUrls: ['./cameras-home.component.css']
})
export class CamerasHomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Cameras | U235+SNR');
  }

}
