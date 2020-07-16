import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TargetParsed, ObservatoryParsed } from '@core/services';
import { U235AstroFlashArg, U235AstroEquatorialCoordinates, U235AstroClock, U235AstroObservatory, U235AstroTarget, U235AstroService } from 'u235-astro';

@Component({
  selector: 'app-assistant-panel',
  templateUrl: './assistant-panel.component.html',
  styleUrls: ['./assistant-panel.component.css']
})
export class AssistantPanelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() id: number;
  @Input() utc: Observable<Date>;
  @Output() notifyRemove: EventEmitter<number> = new EventEmitter();
  utcSubscription: Subscription = null;
  horSubscription: Subscription = null;
  altitudeChange = new Subject<U235AstroFlashArg>();
  hourAngleChange = new Subject<U235AstroFlashArg>();
  redExtinction = 'n/a';
  greenExtinction = 'n/a';
  blueExtinction = 'n/a';
  lumExtinction = 'n/a';

  haveTarget = false;
  haveObservatory = false;

  clock = new U235AstroClock();
  observatory = new U235AstroObservatory();
  target = new U235AstroTarget();

  date$ = new BehaviorSubject<Date>(new Date());
  latitude$ = new BehaviorSubject<number>(0);
  longitude$ = new BehaviorSubject<number>(0);
  equ2000$ = new BehaviorSubject<U235AstroEquatorialCoordinates>({ rightAscension: 0, declination: 0});

  constructor(private utility: U235AstroService, private uService: U235AstroService) {}

  ngOnInit() {
    this.clock.date$ = this.date$.asObservable();
    this.clock.init();

    this.observatory.latitude$ = this.latitude$.asObservable();
    this.observatory.longitude$ = this.longitude$.asObservable();
    this.observatory.connect(this.clock);
    this.observatory.init();

    this.target.geoEqu2000$ = this.equ2000$.asObservable();
    this.target.connect(this.observatory);
    this.target.init();

    this.horSubscription = this.target.geoHorNow$
      .pipe(
        map(value => {
          if (value.altitude >= 15) {
            const airmass = this.uService.calculateAirmass(value.altitude);
            const redExt = this.uService.calculateRedExtinction(airmass);
            const greenExt = this.uService.calculateGreenExtinction(airmass);
            const blueExt = this.uService.calculateBlueExtinction(airmass);
            const lumExt = (redExt + greenExt + blueExt) / 3;
            return { redExt, greenExt, blueExt, lumExt };
          }
          else {
            return {
              redExt: Number.NaN,
              greenExt: Number.NaN,
              blueExt: Number.NaN,
              lumExt: Number.NaN
            }
          }
        }),
        tap(value => {
          this.redExtinction = !isNaN(value.redExt) ? value.redExt.toFixed(2) : 'n/a';
          this.greenExtinction = !isNaN(value.greenExt) ? value.greenExt.toFixed(2) : 'n/a';
          this.blueExtinction = !isNaN(value.blueExt) ? value.blueExt.toFixed(2) : 'n/a';
          this.lumExtinction = !isNaN(value.lumExt) ? value.lumExt.toFixed(2) : 'n/a';
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['utc'].isFirstChange()) {
      this.utcSubscription = this.utc.subscribe(value => {
        this.date$.next(value);
      });
    }
  }

  ngOnDestroy() {
    if (this.utcSubscription) {
      this.utcSubscription.unsubscribe();
    }
    if (this.horSubscription) {
      this.horSubscription.unsubscribe();
    }
  }

  storageToMath = (value: number): number => {
    return this.uService.encodeAngleToMath(this.utility.decodeAngleFromStorage(value));
  }

  onChangeTarget(value: TargetParsed) {
    if (value) {
      this.equ2000$.next({
        rightAscension: this.storageToMath(value.rightAscension),
        declination: this.storageToMath(value.declination)
      });
    }
    this.haveTarget = value !== null;
  }

  onChangeObservatory(value: ObservatoryParsed) {
    if (value) {
      this.latitude$.next(this.storageToMath(value.latitude));
      this.longitude$.next(this.storageToMath(value.longitude));
    }
    this.haveObservatory = value !== null;
  }

  onAltitudeChanged() {
    this.altitudeChange.next({});
  }

  onHourAngleChanged() {
    this.hourAngleChange.next({});
  }

  onRemoveAssistant() {
    this.notifyRemove.emit(this.id);
  }

}
