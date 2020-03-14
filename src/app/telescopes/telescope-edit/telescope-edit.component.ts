import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTelescopeService, TelescopeStored, TelescopeParsed } from '@core/services';

@Component({
  selector: 'app-telescope-edit',
  templateUrl: './telescope-edit.component.html',
  styleUrls: ['./telescope-edit.component.css']
})
export class TelescopeEditComponent implements OnInit {
  pageTitle = 'Edit Telescope';
  browserTitle = this.pageTitle + ' | U235+SNR';
  notFound = 'Telescope not found';
  navigateToUrl = '/telescopes';

  telescope: TelescopeStored = {
    id: -1,
    name: '',
    aperture: '',
    focalLength: '',
    centralObstruction: '',
    totalReflectanceTransmittance: ''
  };

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private router: Router, private telescopeService: UserTelescopeService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        const result = this.telescopeService.getItem(idNum);
        if (result.length) {
          this.telescope = result[0];
          return;
        }
      }
    }
  }

  onSubmit(value: TelescopeParsed) {
    this.telescopeService.update(
      this.telescope.id,
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
