import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TargetParsed } from '@core/services';

@Component({
  selector: 'app-target-form',
  templateUrl: './target-form.component.html',
  styleUrls: ['./target-form.component.css']
})
export class TargetFormComponent implements OnInit {
  @Input() name: string = '';
  @Input() rightAscension: number = 1;
  @Input() declination: number = 1;
  @Input() surfaceBrightness: string = '';
  @Output() notifySubmit:EventEmitter<TargetParsed> = new EventEmitter();
  @Output() notifyCancel:EventEmitter<void> = new EventEmitter();
  targetForm: FormGroup = null;

  constructor() { }

  ngOnInit() {
    const rightAscensionDecoded = this.decodeAngleFromStorage(this.rightAscension);
    const declinationDecoded = this.decodeAngleFromStorage(this.declination);
    this.targetForm = new FormGroup({
      name: new FormControl(this.name, [ Validators.required ]),
      rightAscensionHours: new FormControl(rightAscensionDecoded[1], [ Validators.required, Validators.min(0), Validators.max(23) ]),
      rightAscensionMinutes: new FormControl(rightAscensionDecoded[2], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      rightAscensionSeconds: new FormControl(rightAscensionDecoded[3], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      declinationPM: new FormControl(declinationDecoded[0], [ Validators.required ]),
      declinationDegrees: new FormControl(declinationDecoded[1], [ Validators.required, Validators.min(0), Validators.max(89) ]),
      declinationMinutes: new FormControl(declinationDecoded[2], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      declinationSeconds: new FormControl(declinationDecoded[3], [ Validators.required, Validators.min(0), Validators.max(59) ]),
      surfaceBrightness: new FormControl(this.surfaceBrightness, [ Validators.required ])
    });
  }

  onSubmit() {
    const rightAscensionEncoded = this.encodeAngleToStorage([
      1,
      parseInt(this.targetForm.get('rightAscensionHours').value),
      parseInt(this.targetForm.get('rightAscensionMinutes').value),
      parseInt(this.targetForm.get('rightAscensionSeconds').value),
      0
    ]);
    const declinationEncoded = this.encodeAngleToStorage([
      parseInt(this.targetForm.get('declinationPM').value),
      parseInt(this.targetForm.get('declinationDegrees').value),
      parseInt(this.targetForm.get('declinationMinutes').value),
      parseInt(this.targetForm.get('declinationSeconds').value),
      0
    ]);
    this.notifySubmit.emit({
      id: -1,
      name: this.targetForm.get('name').value,
      surfaceBrightness: this.targetForm.get('surfaceBrightness').value,
      rightAscension: rightAscensionEncoded,
      declination: declinationEncoded
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
