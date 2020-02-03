import { Injectable }       from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageGuard implements CanActivate {
  constructor(private router: Router) {}

  static checkStorage(): boolean {
    // Thanks to @ashaffer88 for supports-localstorage
    const storageName = 'localStorage';
    const testKey = 'supports-localStorage_test';
    if ('undefined' !== typeof window) {
      try {
        var storage = window[storageName];
        if (storage) {
          storage.setItem(testKey, 'OK');
          storage.removeItem(testKey)
          return true;
        }
        else {
          return false;
        }
      }
      catch (error) {
        return false;
      }
    }
    else {
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!LocalStorageGuard.checkStorage()) {
      this.router.navigate(['/errors']);
      return false;
    }
    return true;
  }
}
