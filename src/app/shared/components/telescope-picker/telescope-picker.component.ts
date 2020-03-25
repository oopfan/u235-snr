import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TelescopeParsed, UserTelescopeService } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-telescope-picker',
  templateUrl: './telescope-picker.component.html',
  styleUrls: ['./telescope-picker.component.css']
})
export class TelescopePickerComponent implements OnInit {

  @Input() strict: boolean = true;
  @Output() notifyChange: EventEmitter<TelescopeParsed> = new EventEmitter();
  telescopes: TelescopeParsed[] = [];
  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(private telescopeService: UserTelescopeService) {}

  validateTelescope = (item: TelescopeParsed): boolean => {
    return this.telescopeService.validate(item);
  }

  ngOnInit() {
    this.telescopes = mapSort(this.telescopeService.parseItems(this.telescopeService.getAll()).filter(this.validateTelescope), element => element.name, this.compareString);
  }

  onChangeTelescope(value: string) {
    const id = parseInt(value);
    const telescope = isNaN(id) ? null : this.telescopeService.parseItems(this.telescopeService.getItem(id))[0];
    this.notifyChange.emit(telescope);
  }

}
