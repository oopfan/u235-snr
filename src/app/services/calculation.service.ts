import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  snrStack(
    totalExposureHours: any
  ) {
    const totalExposureSeconds = totalExposureHours * 3600;
    console.log(`totalExposureSeconds: ${totalExposureSeconds}`);
  }
}
