import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserTelescopeService, TelescopeParsed } from 'src/app/services/user-telescope.service';

@Component({
  selector: 'app-telescope-create',
  templateUrl: './telescope-create.component.html',
  styleUrls: ['./telescope-create.component.css']
})
export class TelescopeCreateComponent implements OnInit {

  constructor(private telescopeService: UserTelescopeService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: TelescopeParsed) {
    console.log(value);
    this.telescopeService.create(
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
