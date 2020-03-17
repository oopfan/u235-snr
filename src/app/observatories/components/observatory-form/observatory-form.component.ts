import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObservatoryParsed } from '@core/services';

@Component({
  selector: 'app-observatory-form',
  templateUrl: './observatory-form.component.html',
  styleUrls: ['./observatory-form.component.css']
})
export class ObservatoryFormComponent implements OnInit {
  @Input() name: string = '';
  @Input() bortleClass: string = '';
  @Input() skyBrightness: string = '';
  @Input() latitude: number = 1;
  @Input() longitude: number = 1;
  @Output() notifySubmit:EventEmitter<ObservatoryParsed> = new EventEmitter();
  @Output() notifyCancel:EventEmitter<void> = new EventEmitter();
  observatoryForm: FormGroup = null;

  constructor() { }

  ngOnInit() {
    const latitudeDecoded = this.decodeAngleFromStorage(this.latitude);
    const longitudeDecoded = this.decodeAngleFromStorage(this.longitude);
    this.observatoryForm = new FormGroup({
      name: new FormControl(this.name, [ Validators.required ]),
      bortleClass: new FormControl(this.bortleClass),
      skyBrightness: new FormControl(this.skyBrightness, [ Validators.required ]),
      latitudeDegrees: new FormControl(latitudeDecoded[1], [ Validators.required, Validators.min(0), Validators.max(89) ]),
      latitudeMinutes: new FormControl(latitudeDecoded[2], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      latitudeSeconds: new FormControl(latitudeDecoded[3], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      latitudeNS: new FormControl(latitudeDecoded[0], [ Validators.required ]),
      longitudeDegrees: new FormControl(longitudeDecoded[1], [ Validators.required, Validators.min(0), Validators.max(179) ]),
      longitudeMinutes: new FormControl(longitudeDecoded[2], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      longitudeSeconds: new FormControl(longitudeDecoded[3], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      longitudeEW: new FormControl(longitudeDecoded[0], [ Validators.required ]),
    });
  }

  onSubmit() {
    const latitudeEncoded = this.encodeAngleToStorage([
      parseInt(this.observatoryForm.get('latitudeNS').value),
      parseInt(this.observatoryForm.get('latitudeDegrees').value),
      parseInt(this.observatoryForm.get('latitudeMinutes').value),
      parseInt(this.observatoryForm.get('latitudeSeconds').value),
      0
    ]);
    const longitudeEncoded = this.encodeAngleToStorage([
      parseInt(this.observatoryForm.get('longitudeEW').value),
      parseInt(this.observatoryForm.get('longitudeDegrees').value),
      parseInt(this.observatoryForm.get('longitudeMinutes').value),
      parseInt(this.observatoryForm.get('longitudeSeconds').value),
      0
    ]);
    this.notifySubmit.emit({
      id: -1,
      name: this.observatoryForm.get('name').value,
      bortleClass: this.observatoryForm.get('bortleClass').value,
      skyBrightness: this.observatoryForm.get('skyBrightness').value,
      latitude: latitudeEncoded,
      longitude: longitudeEncoded
    });
  }

  onCancel() {
    this.notifyCancel.emit();
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

}
