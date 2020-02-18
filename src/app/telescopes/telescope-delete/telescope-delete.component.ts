import { Title } from '@angular/platform-browser';
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

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private router: Router, private telescopeService: UserTelescopeService) { }

  ngOnInit() {
    this.titleService.setTitle('Delete Telescope | U235+SNR');
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

  onSubmit() {
    this.telescopeService.delete(
      this.telescope.id
    );
    this.router.navigate(['/telescopes']);
  }

  onCancel() {
    this.router.navigate(['/telescopes']);
  }

}
