import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-targets-home',
  templateUrl: './targets-home.component.html',
  styleUrls: ['./targets-home.component.css']
})
export class TargetsHomeComponent implements OnInit {

  constructor(private userData: UserDataService) { }

  ngOnInit() {
  }

  title = 'snrcalc';
  userTargetProfiles = this.userData.getAllTargets();

  onNewTarget() {
    const target = this.userData.createTarget('', '');
    this.userTargetProfiles = this.userData.getAllTargets();
  }

  onUpdateTarget(target: any) {
    this.userData.updateTarget(target.id, target.name, target.surfaceBrightness);
  }

  onDeleteTarget(id: number) {
    this.userData.deleteTarget(id);
    this.userTargetProfiles = this.userData.getAllTargets();
  }

}
