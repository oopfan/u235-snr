import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserObservatoryService, ObservatoryParsed } from '@core/services';

@Component({
  selector: 'app-observatory-create',
  templateUrl: './observatory-create.component.html',
  styleUrls: ['./observatory-create.component.css']
})
export class ObservatoryCreateComponent implements OnInit {
  browserTitle = 'New Observatory | U235+SNR';
  pageTitle = 'New Observatory';
  navigateToUrl = '/observatories';

  constructor(private titleService: Title, private observatoryService: UserObservatoryService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

  onSubmit(value: ObservatoryParsed) {
    this.observatoryService.create(
      value.name,
      '' + value.bortleClass,
      '' + value.skyBrightness,
      value.latitude,
      value.longitude
    );
    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }

}
