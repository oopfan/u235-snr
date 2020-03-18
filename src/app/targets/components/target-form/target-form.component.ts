import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TargetParsed, UtilityService } from '@core/services';

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

  constructor(private utility: UtilityService) { }

  ngOnInit() {
    const rightAscensionDecoded = this.utility.decodeAngleFromStorage(this.rightAscension);
    const declinationDecoded = this.utility.decodeAngleFromStorage(this.declination);
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
    const rightAscensionEncoded = this.utility.encodeAngleToStorage([
      1,
      parseInt(this.targetForm.get('rightAscensionHours').value),
      parseInt(this.targetForm.get('rightAscensionMinutes').value),
      parseInt(this.targetForm.get('rightAscensionSeconds').value),
      0
    ]);
    const declinationEncoded = this.utility.encodeAngleToStorage([
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

}
