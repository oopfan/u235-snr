import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObservatoryParsed, UserObservatoryService } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-observatory-picker',
  templateUrl: './observatory-picker.component.html',
  styleUrls: ['./observatory-picker.component.css']
})
export class ObservatoryPickerComponent implements OnInit {

  @Input() strict: boolean = true;
  @Output() notifyChange: EventEmitter<ObservatoryParsed> = new EventEmitter();
  observatories: ObservatoryParsed[] = [];
  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(private observatoryService: UserObservatoryService) {}

  validateObservatory = (item: ObservatoryParsed): boolean => {
    let result = this.observatoryService.validate(item);
    if (result && this.strict) {
      result = item.latitude !== 1 && item.longitude !== 1;
    }
    return result;
  }

  ngOnInit() {
    this.observatories = mapSort(this.observatoryService.parseItems(this.observatoryService.getAll()).filter(this.validateObservatory), element => element.name, this.compareString);
  }

  onChangeObservatory(value: string) {
    const id = parseInt(value);
    const observatory = isNaN(id) ? null : this.observatoryService.parseItems(this.observatoryService.getItem(id))[0];
    this.notifyChange.emit(observatory);
  }

}
