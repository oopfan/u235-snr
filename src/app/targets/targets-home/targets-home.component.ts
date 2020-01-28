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
  nextId = 1;

  onNewTarget() {
    const newTarget = {
      id: this.nextId++,
      name: '',
      surfaceBrightness: ''
    };
    this.userTargetProfiles.unshift(newTarget);
  }

  onDeleteTarget(id: number) {
    const index = this.userTargetProfiles.findIndex((element) => {
      return element.id === id;
    });
    console.log(`id:${id} index:${index}`);
    if (index >= 0) {
      this.userTargetProfiles.splice(index, 1);
    }
  }

}
