import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTelescopeService, TelescopeStored, TelescopeParsed } from '../../services/user-telescope.service'

@Component({
  selector: 'app-telescope-edit',
  templateUrl: './telescope-edit.component.html',
  styleUrls: ['./telescope-edit.component.css']
})
export class TelescopeEditComponent implements OnInit {
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
    this.titleService.setTitle('Edit Telescope | U235+SNR');
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
    this.router.navigate(['/telescopes']);
  }

  onCancel() {
    this.router.navigate(['/telescopes']);
  }

}
