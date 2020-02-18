import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTelescopeService, TelescopeStored, TelescopeParsed } from '../../services/user-telescope.service'

@Component({
  selector: 'app-telescope-delete',
  templateUrl: './telescope-delete.component.html',
  styleUrls: ['./telescope-delete.component.css']
})
export class TelescopeDeleteComponent implements OnInit {
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
    this.telescopeService.delete(
      this.telescope.id
    );

    this.router.navigate(['/telescopes']);
  }

  onCancel(value: string) {
    this.router.navigate(['/telescopes']);
  }

}
