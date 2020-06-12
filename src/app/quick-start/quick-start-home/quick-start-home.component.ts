import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserTargetService, UserTelescopeService, UserCameraService, UserObservatoryService } from '@core/services';

@Component({
  selector: 'app-quick-start-home',
  templateUrl: './quick-start-home.component.html',
  styleUrls: ['./quick-start-home.component.css']
})
export class QuickStartHomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Quick Start';
  browserTitle = this.pageTitle + ' | U235+SNR';
  navigateToUrl = '/';
  targetCount = 0;
  telescopeCount = 0;
  cameraCount = 0;
  observatoryCount = 0;
  countDown = 0;
  intervalId = 0;
  action: string;

  constructor(
    private titleService: Title,
    private router: Router,
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.targetCount = this.targetService.getAll().length;
    this.telescopeCount = this.telescopeService.getAll().length;
    this.cameraCount = this.cameraService.getAll().length;
    this.observatoryCount = this.observatoryService.getAll().length;
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalId);
  }

  onSubmit() {
    if (this.targetCount === 0) {
      this.targetService.create('M27 Dumbbell Nebula', '20.2', 171203100673, 194787672065);
      this.targetService.create('M51 Whirlpool Galaxy', '21.7', 115672612865, 405295595521);
    }
    if (this.telescopeCount === 0) {
      this.telescopeService.create('Vixen 81s w/ 0.67x reducer', '81', '418', '0', '0.99');
      this.telescopeService.create('William Optics ZenithStar 71', '71', '418', '0', '0.99');
    }
    if (this.cameraCount === 0) {
      this.cameraService.create('Atik 314E', '4.65', '5.3', '0', '43');
      this.cameraService.create('Altair 290M (Gain 200)', '2.9', '1.55', '0', '60');
    }
    if (this.observatoryCount === 0) {
      this.observatoryService.create('Home', '6', '19.23', 459702009857, 17618173952);
      this.observatoryService.create('Traveler', '4', '20.85', 355750379521, 633847414784);
    }
    this.action = 'Completed!';
    this.forward();
  }

  onCancel() {
    this.action = 'Cancelled.';
    this.forward();
  }

  forward() {
    this.countDown = 3;
    this.intervalId = window.setInterval(() => {
      this.countDown--;
      if (this.countDown === 0) {
        this.router.navigate([ this.navigateToUrl ]);
      }
    }, 1000);
  }
}
