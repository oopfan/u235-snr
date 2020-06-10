import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserObservatoryService, ObservatoryStored, UtilityService } from '@core/services';

@Component({
  selector: 'app-observatory-delete',
  templateUrl: './observatory-delete.component.html',
  styleUrls: ['./observatory-delete.component.css']
})
export class ObservatoryDeleteComponent implements OnInit {
  browserTitle = 'Delete Observatory | U235+SNR';
  pageTitle = 'Delete Observatory';
  notFound = 'Observatory not found';
  navigateToUrl = '/observatories';
  latitude: number;
  longitude: number;

  observatory: ObservatoryStored = {
    id: -1,
    name: '',
    bortleClass: '',
    skyBrightness: '',
    latitude: 0,
    longitude: 0
  };

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private observatoryService: UserObservatoryService,
    private utility: UtilityService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        const result = this.observatoryService.getItem(idNum);
        if (result.length) {
          this.observatory = result[0];
          this.latitude = this.utility.encodeAngleToMath(this.utility.decodeAngleFromStorage(this.observatory.latitude));
          this.longitude = this.utility.encodeAngleToMath(this.utility.decodeAngleFromStorage(this.observatory.longitude));
          return;
        }
      }
    }
  }

  onSubmit() {
    this.observatoryService.delete(
      this.observatory.id
    );
    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }

}
