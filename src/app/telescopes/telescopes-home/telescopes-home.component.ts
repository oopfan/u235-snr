import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { UserTelescopeService } from 'src/app/services/user-telescope.service';

@Component({
  selector: 'app-telescopes-home',
  templateUrl: './telescopes-home.component.html',
  styleUrls: ['./telescopes-home.component.css']
})
export class TelescopesHomeComponent implements OnInit {

  constructor(private titleService: Title, private router: Router, private telescopeService: UserTelescopeService) { }

  telescopes = [];

  ngOnInit() {
    this.titleService.setTitle('Telescopes | U235+SNR');
    this.telescopeService.sort();
    this.telescopes = this.telescopeService.getAll();
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

  onNew() {
    this.telescopeService.create('', '', '', '', '');
    this.telescopes = this.telescopeService.getAll();
  }

  onSaveAll() {
    this.telescopeService.saveAll();
  }

  onDiscard() {
    this.telescopeService.discard();
    this.telescopes = this.telescopeService.getAll();
  }

  onUpdate(telescope: any) {
    this.telescopeService.update(telescope.id, telescope.name, telescope.aperture, telescope.focalLength, telescope.centralObstruction, telescope.totalReflectanceTransmittance);
  }

  onDelete(id: number) {
    this.telescopeService.delete(id);
    this.telescopes = this.telescopeService.getAll();
  }

  onSave(id: number) {
    // Right now, can't save an individual telescope to Local Storage, just all telescopes.
    this.telescopeService.saveAll();
  }

}
