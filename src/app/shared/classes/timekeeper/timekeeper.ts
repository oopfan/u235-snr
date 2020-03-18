export class Timekeeper {
  private _date: Date;
  private _jd: number;
  private _jd0: number;
  private _gmst: number;
  private _gmst0: number;

  constructor() {
    this._date = new Date();
    this._jd = 0;
    this._jd0 = 0;
    this._gmst = 0;
    this._gmst0 = 0;
  }

  setDate(value: Date) {
    this._date = value;
    this._calculateJD0FromDate();
    this._calculateJD();
    this._calculateGMST0();
    this._calculateGMST();
  }

  getDate(): Date {
    return this._date;
  }

  setJD(value: number) {
    this._jd = value;
    this._calculateJD0FromJD();
    this._calculateDate();
    this._calculateGMST0();
    this._calculateGMST();
  }

  getJD(): number {
    return this._jd;
  }

  getJD0(): number {
    return this._jd0;
  }

  getGMST(): number {
    return this._gmst;
  }

  getGMST0(): number {
    return this._gmst0;
  }

  private _calculateJD0FromDate() {
    let yp = this._date.getUTCFullYear();
    let mp = this._date.getUTCMonth() + 1;
    if (mp <= 2) {
      mp += 12;
      yp -= 1;
    }
    let jd0 = Math.trunc(36525 * yp / 100);
    jd0 += Math.trunc((306001 * (1 + mp)) / 10000);
    jd0 += this._date.getUTCDate() + 2 + Math.trunc(yp / 400);
    jd0 -= Math.trunc(yp / 100);
    this._jd0 = jd0 + 1720994.5;
  }

  private _calculateJD0FromJD() {
    this._jd0 = Math.floor(this._jd + 0.5) - 0.5;
  }

  private _calculateJD() {
    this._jd = this._jd0 +
      ((this._date.getUTCHours() + (this._date.getUTCMinutes() +
      (this._date.getUTCSeconds() + this._date.getUTCMilliseconds() /
      1000.0) / 60.0) / 60.0) / 24.0);
  }

  private _calculateDate() {
    const JGREG = 15 + 31 * (10 + 12 * 1582);
    const julian = this._jd;
    const p = julian - Math.floor(julian);
    let ja = Math.trunc(Math.floor(julian));
    if (ja >= JGREG) {
      const jalpha = Math.trunc(((ja - 1867216) - 0.25) / 36524.25);
      ja += 1 + jalpha - Math.trunc(jalpha / 4);
    }
    const jb = ja + 1524;
    const jc = Math.trunc(6680.0 + ((jb - 2439870) - 122.1) / 365.25);
    const jdd = 365 * jc + Math.trunc(jc / 4);
    const je = Math.trunc((jb - jdd) / 30.6001);
    const day = jb - jdd - Math.trunc(30.6001 * je);
    let month = je - 1;
    if (month > 12) {
      month -= 12;
    }
    let year = jc - 4715;
    if (month > 2) {
      year -= 1;
    }
    if (year <= 0) {
      year -= 1;
    }
    this._date = new Date(
      Date.UTC(year, month - 1, day) +
      Math.trunc((p + 0.5) * 24 * 60 * 60 * 1000 + 0.5));
  }

  private _calculateGMST0() {
    const tu = (this._jd0 - 2451545.0) / 36525.0;
    let T = (24110.54841 + tu * (8640184.812866 + tu * (0.093104 - tu * 6.2e-6))) / 3600.0;
    T = T % 24;
    // We need the check below since 'tu' can go negative:
    if (T < 0) {
      T += 24;
    }
    this._gmst0 = T;
  }

  private _calculateGMST() {
    const T = this._gmst0 +
      ((this._date.getUTCHours() + (this._date.getUTCMinutes() +
      (this._date.getUTCSeconds() + this._date.getUTCMilliseconds() / 1000.0) /
      60.0) / 60.0) * 1.00273790934);
    // But we don't need the check here since we know that 'gmst0' is positive
    // as well as UTC hours, minutes, seconds, and milliseconds.
    this._gmst = T % 24;
  }

}
