import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserTelescopeService, TelescopeParsed } from 'src/app/services/user-telescope.service';

@Component({
  selector: 'app-telescope-create',
  templateUrl: './telescope-create.component.html',
  styleUrls: ['./telescope-create.component.css']
})
export class TelescopeCreateComponent implements OnInit {
  pageTitle = 'New Telescope';
  browserTitle = this.pageTitle + ' | U235+SNR';
  navigateToUrl = '/telescopes';

  constructor(private titleService: Title, private telescopeService: UserTelescopeService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

  onSubmit(value: TelescopeParsed) {
    this.telescopeService.create(
      value.name,
      '' + value.aperture,
      '' + value.focalLength,
      '' + value.centralObstruction,
      '' + value.totalReflectanceTransmittance
    );
    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }
}
