import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-telescopes-home',
  templateUrl: './telescopes-home.component.html',
  styleUrls: ['./telescopes-home.component.css']
})
export class TelescopesHomeComponent implements OnInit {

  constructor(private titleService: Title, private userData: UserDataService) { }

  ngOnInit() {
    this.titleService.setTitle('Telescopes | U235+SNR');
  }

  userTelescopeProfiles = this.userData.getAllTelescopes();

  onNewTelescope() {
    const telescope = this.userData.createTelescope('', '', '', '', '');
    this.userTelescopeProfiles = this.userData.getAllTelescopes();
  }

  onSaveAll() {
    this.userData.saveTelescopes();
  }

  onDiscardChanges() {
    this.userData.discardTelescopes();
    this.userTelescopeProfiles = this.userData.getAllTelescopes();
  }

  onUpdateTelescope(telescope: any) {
    this.userData.updateTelescope(telescope.id, telescope.name, telescope.aperture, telescope.focalLength, telescope.centralObstruction, telescope.totalReflectanceTransmittance);
  }

  onDeleteTelescope(id: number) {
    this.userData.deleteTelescope(id);
    this.userTelescopeProfiles = this.userData.getAllTelescopes();
  }

  onSaveTelescope(id: number) {
    // Right now, can't save an individual telescope to Local Storage, just all telescopes.
    this.userData.saveTelescopes();
  }

}
