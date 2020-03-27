import { Injectable } from '@angular/core';
import { Timekeeper, Matrix3D, Vector3D } from '@shared/classes';
import { TargetParsed, ObservatoryParsed } from '@core/services';

interface HorizontalCoordinates {
  altitudeDegrees: number,
  hourAngle: number
}

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  calculateAltitude(date: Date, target: TargetParsed, observatory: ObservatoryParsed): number {
    const result = this.calculateHorizontalCoordinates(date, target, observatory);
    return result.altitudeDegrees;
  }

  calculateHorizontalCoordinates(date: Date, target: TargetParsed, observatory: ObservatoryParsed): HorizontalCoordinates {
    const timekeeper = new Timekeeper();
    timekeeper.setDate(date);
    const jd = timekeeper.getJD();
    const gmst = timekeeper.getGMST();

    const obliquity = this.calculateObliquityOfEcliptic(jd);
    const precession = this.calculatePrecessionSinceJ2000(jd);

    const raDecoded = this.decodeAngleFromStorage(target.rightAscension);
    const raHours = this.encodeAngleToMath(raDecoded);
    const decDecoded = this.decodeAngleFromStorage(target.declination);
    const decDegrees = this.encodeAngleToMath(decDecoded);

    const longitudeDecoded = this.decodeAngleFromStorage(observatory.longitude);
    const longitudeDegrees = this.encodeAngleToMath(longitudeDecoded);
    const latitudeDecoded = this.decodeAngleFromStorage(observatory.latitude);
    const latitudeDegrees = this.encodeAngleToMath(latitudeDecoded);

    let lmstDegrees = gmst * 15 + longitudeDegrees;
    if (lmstDegrees < 0) {
      lmstDegrees += 360;
    }
    if (lmstDegrees >= 360) {
      lmstDegrees -= 360;
    }
    const lmstRadians = this.toRadians(lmstDegrees);

    const matEquToEcl = new Matrix3D();
    matEquToEcl.setRotateX(obliquity);
    const matEclToEqu = new Matrix3D();
    matEclToEqu.setRotateX(-obliquity);
    const matPrecessToDate = new Matrix3D();
    matPrecessToDate.setRotateZ(-precession);

    const rotY = new Matrix3D();
    rotY.setRotateY(this.toRadians(90 - latitudeDegrees));
    const rotZ = new Matrix3D();
    rotZ.setRotateZ(lmstRadians);
    const matEquToHor = new Matrix3D();
    matEquToHor.matrixMultiply(rotY).matrixMultiply(rotZ);

    const vec = new Vector3D();
    vec.setPolar(this.toRadians(raHours * 15), this.toRadians(decDegrees), 1);
    vec.matrixMultiply(matEquToEcl);
    vec.matrixMultiply(matPrecessToDate);
    vec.matrixMultiply(matEclToEqu);
    let polar = vec.getPolar();
    let raNow = polar[0];
    if (raNow < 0) {
      raNow += 2 * Math.PI;
    }
    vec.matrixMultiply(matEquToHor);

    polar = vec.getPolar();
    const altitudeDegrees = this.toDegrees(polar[1]);

    let hourAngle = this.toDegrees(lmstRadians - raNow) / 15;
    if (hourAngle > 12) {
      hourAngle -= 24;
    }
    if (hourAngle < -12) {
      hourAngle += 24;
    }

    return { altitudeDegrees, hourAngle };
  }

  calculateObliquityOfEcliptic(jd: number): number {
    const obliquity = this.toRadians(23.4393 - 3.563E-7 * (jd - 2451543.5));
    return obliquity;
  }

  calculatePrecessionSinceJ2000(jd: number): number {
    var precession = this.toRadians(3.82394E-5 * (jd - 2451543.5));
    return precession;
  }

  toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  toDegrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  formatHMS(radians: number): string {
    let hours = radians * 12 / Math.PI;
    if (hours < 0) {
        hours += 24;
    }
    hours += 0.001 / 60 / 60;
    if (hours >= 24) {
        hours -= 24;
    }
    let remainder = hours;
    const hour = Math.floor(remainder);
    remainder = (remainder - hour) * 60;
    const minute = Math.floor(remainder);
    remainder = (remainder - minute) * 60;
    const second = remainder;

    let temp = '0' + hour.toFixed(0);
    let str = temp.substr(temp.length - 2, 2);
    str += ':';
    temp = '0' + minute.toFixed(0);
    str += temp.substr(temp.length - 2, 2);
    str += ':';
    temp = '0' + second.toFixed(0);
    str += temp.substr(temp.length - 2, 2);
    return str;
  }

  encodeAngleToStorage(dec: number[]): number {
    // Packs an angle into a Javascript Number object.
    // This is a loss-less implementation using powers of 2.
    //  dec is an array of five integers:
    //  dec[0] is sign: -1 or 1
    //  dec[1] is degrees: 0 to 360
    //  dec[2] is minutes: 0 to 59
    //  dec[3] is seconds: 0 to 59
    //  dec[4] is microseconds: 0 to 999999
    // Example:
    //  Input: [-1, 73, 50, 17, 600000]
    //  Output: -316906481600 (wrong, must update)
    //  which represents the longitude of home at 73 deg 50 min 17.6 sec West
    var sign = dec[0] > 0 ? 1 : 0;
    var enc = (dec[4] + (dec[3] + (dec[2] + dec[1] * 64) * 64) * 1048576) * 2 + sign;
    return enc;
  }

  decodeAngleFromStorage(enc: number): number[] {
    // Unpacks an angle (see function 'encodeAngleToStorage')
    // Example:
    //  Input: -316906481600 (wrong, must update)
    //  Output: [-1, 73, 50, 17, 600000]
    //  which represents the longitude of home at 73 deg 50 min 17.6 sec West
    var sign = enc % 2;
    enc = (enc - sign) / 2;
    var usec = enc % 1048576;
    enc = (enc - usec) / 1048576;
    var sec = enc % 64;
    enc = (enc - sec) / 64;
    var min = enc % 64;
    enc = (enc - min) / 64;
    var deg = enc;
    sign = sign > 0 ? 1 : -1;
    return [sign, deg, min, sec, usec];
  }

  encodeAngleToMath(dec: number[]): number {
    // Converts a decoded angle to decimal degrees.
    //  dec is an array of five integers:
    //  dec[0] is sign: -1 or 1
    //  dec[1] is degrees: 0 to 360
    //  dec[2] is minutes: 0 to 59
    //  dec[3] is seconds: 0 to 59
    //  dec[4] is microseconds: 0 to 999999
    var arcusec = ((dec[4] + (dec[3] + (dec[2] + dec[1] * 60) * 60) * 1000000) * dec[0]);
    return arcusec / (60 * 60 * 1000000);
  }

  decodeAngleFromMath(enc: number): number[] {
    // Unpacks an angle (see function 'encodeAngleToMath')
    var sign = 1;
    if (enc < 0) {
        sign = -1;
        enc = -enc;
    }
    enc = Math.trunc(enc * (60 * 60 * 1000000));
    var usec = enc % 1000000;
    enc = (enc - usec) / 1000000;
    var sec = enc % 60;
    enc = (enc - sec) / 60;
    var min = enc % 60;
    enc = (enc - min) / 60;
    var deg = enc;
    return [sign, deg, min, sec, usec];
  }

}
