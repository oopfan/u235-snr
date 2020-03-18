import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

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

}
