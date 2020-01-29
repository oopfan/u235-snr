import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-observatories-home',
  templateUrl: './observatories-home.component.html',
  styleUrls: ['./observatories-home.component.css']
})
export class ObservatoriesHomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Observatories | U235+SNR');
  }

}
