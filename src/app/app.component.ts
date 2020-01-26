import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snrcalc';
  userTargetProfiles = [
    {
      name: 'M51 Whirlpool Galaxy',
      surfaceBrightness: '21.7'
    },
    {
      name: "M81 Bode's Galaxy",
      surfaceBrightness: '21.7'
    },
    {
      name: "M94 Croc's Eye Galaxy",
      surfaceBrightness: '22.4'
    }
  ];

  onSurfaceBrightness(value: number) {
    console.log(`Surface Brightness: ${value}`);
  }
}
