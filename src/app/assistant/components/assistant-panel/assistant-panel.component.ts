import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UtilityService, AtmosphericExtinctionService, TargetParsed, ObservatoryParsed } from '@core/services';

@Component({
  selector: 'app-assistant-panel',
  templateUrl: './assistant-panel.component.html',
  styleUrls: ['./assistant-panel.component.css']
})
export class AssistantPanelComponent implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() notifyUTC: Observable<Date>;
  @Output() notifyRemove: EventEmitter<number> = new EventEmitter();
  private utcSubscription: Subscription;
  date: Date = null;
  target: TargetParsed = null;
  observatory: ObservatoryParsed = null;
  altitudeChanged = 0;
  altitude = [ 1, 0, 0, 0, 0];
  hourAngleChanged = 0;
  hourAngle = [ 1, 0, 0, 0, 0 ];
  redExtinction = 'n/a';
  greenExtinction = 'n/a';
  blueExtinction = 'n/a';
  lumExtinction = 'n/a';

  constructor(private utility: UtilityService, private extinctionService: AtmosphericExtinctionService) { }

  ngOnInit() {
    if (this.notifyUTC) {
      this.utcSubscription = this.notifyUTC.subscribe((date: Date) => {
        this.date = date;
        this.update();
      });
    }
  }

  ngOnDestroy() {
    if (this.utcSubscription) {
      this.utcSubscription.unsubscribe();
    }
  }

  onRemoveAssistant() {
    this.notifyRemove.emit(this.id);
  }

  onAltitudeChanged() {
    this.altitudeChanged++;
  }

  onHourAngleChanged() {
    this.hourAngleChanged++;
  }

  onChangeTarget(value: TargetParsed) {
    this.target = value;
    if (this.target) {
      this.update();
    }
  }

  onChangeObservatory(value: ObservatoryParsed) {
    this.observatory = value;
    if (this.observatory) {
      this.update();
    }
  }

  haveTarget(): boolean {
    return this.target !== null;
  }

  haveObservatory(): boolean {
    return this.observatory !== null;
  }

  update() {
    if (this.date && this.target && this.observatory) {
      const result = this.utility.calculateHorizontalCoordinates(this.date, this.target, this.observatory);
      this.altitude = this.utility.decodeAngleFromMath(result.altitudeDegrees);
      this.hourAngle = this.utility.decodeAngleFromMath(result.hourAngle);

      const redExt = this.extinctionService.redExtinction(result.altitudeDegrees);
      const greenExt = this.extinctionService.greenExtinction(result.altitudeDegrees);
      const blueExt = this.extinctionService.blueExtinction(result.altitudeDegrees);
      const lumExt = (redExt + greenExt + blueExt) / 3;

      this.redExtinction = !isNaN(redExt) ? redExt.toFixed(2) : 'n/a';
      this.greenExtinction = !isNaN(greenExt) ? greenExt.toFixed(2) : 'n/a';
      this.blueExtinction = !isNaN(blueExt) ? blueExt.toFixed(2) : 'n/a';
      this.lumExtinction = !isNaN(lumExt) ? lumExt.toFixed(2) : 'n/a';
    }
  }

}
