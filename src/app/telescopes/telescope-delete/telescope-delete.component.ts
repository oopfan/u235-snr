import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTelescopeService, TelescopeStored } from '../../services/user-telescope.service'

@Component({
  selector: 'app-telescope-delete',
  templateUrl: './telescope-delete.component.html',
  styleUrls: ['./telescope-delete.component.css']
})
export class TelescopeDeleteComponent implements OnInit {
  pageTitle = 'Delete Telescope';
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

  onSubmit() {
    this.telescopeService.delete(
      this.telescope.id
    );
    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }

}
