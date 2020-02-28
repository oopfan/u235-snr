import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { UserTelescopeService, TelescopeStored } from 'src/app/services/user-telescope.service';

@Component({
  selector: 'app-telescopes-home',
  templateUrl: './telescopes-home.component.html',
  styleUrls: ['./telescopes-home.component.css']
})
export class TelescopesHomeComponent implements OnInit {
  browserTitle = 'Telescopes | U235+SNR';
  pageTitle = 'Telescopes';
  telescopes = [];

  constructor(private titleService: Title, private router: Router, private telescopeService: UserTelescopeService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.telescopes = this.telescopeService.getAll();
    this.telescopes.sort((a: TelescopeStored, b: TelescopeStored) => a.name.localeCompare(b.name));
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

  onNew() {
    this.router.navigate(['/new-telescope']);
  }

  onEdit(id: number) {
    this.router.navigate(['/edit-telescope', id]);
  }

  onDelete(id: number) {
    this.router.navigate(['/delete-telescope', id]);
  }

}
