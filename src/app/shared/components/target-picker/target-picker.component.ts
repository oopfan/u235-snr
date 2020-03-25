import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TargetParsed, UserTargetService } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-target-picker',
  templateUrl: './target-picker.component.html',
  styleUrls: ['./target-picker.component.css']
})
export class TargetPickerComponent implements OnInit {

  @Output() notifyChange: EventEmitter<TargetParsed> = new EventEmitter();
  targets: TargetParsed[] = [];
  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(private targetService: UserTargetService) {}

  validateTarget = (item: TargetParsed): boolean => {
    return this.targetService.validate(item) && item.rightAscension !== 1 && item.declination !== 1;
  }

  ngOnInit() {
    this.targets = mapSort(this.targetService.parseItems(this.targetService.getAll()).filter(this.validateTarget), element => element.name, this.compareString);
  }

  onChangeTarget(value: string) {
    const id = parseInt(value);
    const target = isNaN(id) ? null: this.targetService.parseItems(this.targetService.getItem(id))[0];
    this.notifyChange.emit(target);
  }

}
