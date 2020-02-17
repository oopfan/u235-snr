import { AbstractControl } from '@angular/forms';

export class TelescopeValidator {
  static apertureCheck(form: AbstractControl) {
    if (form) {
      const { aperture, centralObstruction } = form.value;
      if (isNaN(parseInt(aperture)) || isNaN(parseInt(centralObstruction))) {
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
