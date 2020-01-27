import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snrcalc';
  userTargetProfiles = [];
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
