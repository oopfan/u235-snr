import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TargetParsed, UserTargetService } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-target-picker',
  templateUrl: './target-picker.component.html',
  styleUrls: ['./target-picker.component.css']
})
export class TargetPickerComponent implements OnInit {

  @Input() strict: boolean = true;
  @Output() notifyChange: EventEmitter<TargetParsed> = new EventEmitter();
  targets: TargetParsed[] = [];
  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(private targetService: UserTargetService) {}

  validateTarget = (item: TargetParsed): boolean => {
    let result = this.targetService.validate(item);
    if (result && this.strict) {
      result = item.rightAscension !== 1 && item.declination !== 1;
    }
    return result;
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
