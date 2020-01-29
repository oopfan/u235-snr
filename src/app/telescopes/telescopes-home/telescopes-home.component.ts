import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telescopes-home',
  templateUrl: './telescopes-home.component.html',
  styleUrls: ['./telescopes-home.component.css']
})
export class TelescopesHomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Telescopes | U235+SNR');
  }

}
