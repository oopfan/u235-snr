import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { UserTargetService } from '../user-target/user-target.service';
import { UserTelescopeService } from '../user-telescope/user-telescope.service';
import { UserCameraService } from '../user-camera/user-camera.service';
import { UserObservatoryService } from '../user-observatory/user-observatory.service';

@Injectable({
  providedIn: 'root'
})
export class QuickStartGuard implements CanActivate {
  static checkOnce = true;

  constructor(
    private router: Router,
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService) { }

  checkForMissingProfiles(): boolean {
    return (
      this.targetService.getAll().length === 0 ||
      this.telescopeService.getAll().length === 0 ||
      this.cameraService.getAll().length === 0 ||
      this.observatoryService.getAll().length === 0
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (QuickStartGuard.checkOnce) {
      QuickStartGuard.checkOnce = false;
      if (this.checkForMissingProfiles()) {
        this.router.navigate(['/quick-start']);
        return false;
      }
    }
    return true;
  }

}
