import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserObservatoryService, ObservatoryStored, ObservatoryParsed } from '@core/services';

@Component({
  selector: 'app-observatory-edit',
  templateUrl: './observatory-edit.component.html',
  styleUrls: ['./observatory-edit.component.css']
})
export class ObservatoryEditComponent implements OnInit {
  browserTitle = 'Edit Observatory | U235+SNR';
  pageTitle = 'Edit Observatory';
  observatoryNotFound = 'Observatory not found';
  navigateToUrl = '/observatories';

  observatory: ObservatoryStored = {
    id: -1,
    name: '',
    bortleClass: '',
    skyBrightness: '',
    latitude: 0,
    longitude: 0
  };

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private router: Router, private observatoryService: UserObservatoryService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        const result = this.observatoryService.getItem(idNum);
        if (result.length) {
          this.observatory = result[0];
          return;
        }
      }
    }
  }

  onSubmit(value: ObservatoryParsed) {
    this.observatoryService.update(
      this.observatory.id,
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
