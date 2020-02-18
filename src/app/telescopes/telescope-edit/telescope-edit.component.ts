import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTelescopeService, TelescopeStored, TelescopeParsed } from '../../services/user-telescope.service'

@Component({
  selector: 'app-telescope-edit',
  templateUrl: './telescope-edit.component.html',
  styleUrls: ['./telescope-edit.component.css']
})
export class TelescopeEditComponent implements OnInit {
  telescope: TelescopeStored = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private telescopeService: UserTelescopeService) { }

  ngOnInit() {
    this.telescope = null;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        const result = this.telescopeService.getItem(idNum);
        if (result.length) {
          this.telescope = result[0];
        }
      }
    }
    if (!this.telescope) {
      this.router.navigate(['/home']);
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

  onCancel(value: string) {
    this.router.navigate(['/telescopes']);
  }

}
