import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObservatoryParsed, UtilityService } from '@core/services';

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

  constructor(private utility: UtilityService) { }

  ngOnInit() {
    const latitudeDecoded = this.utility.decodeAngleFromStorage(this.latitude);
    const longitudeDecoded = this.utility.decodeAngleFromStorage(this.longitude);
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
    const latitudeEncoded = this.utility.encodeAngleToStorage([
      parseInt(this.observatoryForm.get('latitudeNS').value),
      parseInt(this.observatoryForm.get('latitudeDegrees').value),
      parseInt(this.observatoryForm.get('latitudeMinutes').value),
      parseInt(this.observatoryForm.get('latitudeSeconds').value),
      0
    ]);
    const longitudeEncoded = this.utility.encodeAngleToStorage([
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

}
