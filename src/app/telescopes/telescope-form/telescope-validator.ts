import { AbstractControl } from '@angular/forms';

export class TelescopeValidator {
  static apertureCheck(form: AbstractControl) {
    if (form) {
      const aperture = parseInt(form.value.aperture);
      const centralObstruction = parseInt(form.value.centralObstruction);
      if (isNaN(aperture) || isNaN(centralObstruction)) {
        return null;
      }
      if (centralObstruction < aperture) {
        return null;
      }
      return { apertureCheck: true };
    }
    return null;
  }
}
