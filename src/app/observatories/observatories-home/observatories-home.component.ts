import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-observatories-home',
  templateUrl: './observatories-home.component.html',
  styleUrls: ['./observatories-home.component.css']
})
export class ObservatoriesHomeComponent implements OnInit {

  constructor(private titleService: Title, private userData: UserDataService) { }

  ngOnInit() {
    this.titleService.setTitle('Observatories | U235+SNR');
  }

  userObservatoryProfiles = this.userData.getAllObservatories();

  onNewObservatory() {
    const observatory = this.userData.createObservatory('', '', '');
    this.userObservatoryProfiles = this.userData.getAllObservatories();
  }

  onSaveAll() {
    this.userData.saveObservatories();
  }

  onDiscardChanges() {
    this.userData.discardObservatories();
    this.userObservatoryProfiles = this.userData.getAllObservatories();
  }

  onUpdateObservatory(observatory: any) {
    this.userData.updateObservatory(observatory.id, observatory.name, observatory.bortleClass, observatory.skyBrightness);
  }

  onDeleteObservatory(id: number) {
    this.userData.deleteObservatory(id);
    this.userObservatoryProfiles = this.userData.getAllObservatories();
  }

}
