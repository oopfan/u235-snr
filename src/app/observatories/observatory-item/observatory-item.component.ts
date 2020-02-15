import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-observatory-item',
  templateUrl: './observatory-item.component.html',
  styleUrls: ['./observatory-item.component.css']
})
export class ObservatoryItemComponent implements OnInit {
  @Input() id:number = 0;
  @Input() name:string = '';
  @Input() bortleClass:string = '';
  @Input() skyBrightness:string = '';
  @Output() notifyHelp:EventEmitter<string> = new EventEmitter();
  @Output() notifySave:EventEmitter<number> = new EventEmitter();
  @Output() notifyDelete:EventEmitter<number> = new EventEmitter();
  @Output() notifyUpdate:EventEmitter<object> = new EventEmitter();

  onChangeName(value: string) {
    this.name = value;
    this.emitUpdate();
  }

  onChangeBortleClass(value: string) {
    this.bortleClass = value;
    this.emitUpdate();
  }

  onChangeSkyBrightness(value: string) {
    this.skyBrightness = value;
    this.emitUpdate();
  }

  private emitUpdate() {
    this.notifyUpdate.emit({
      id: this.id,
      name: this.name,
      bortleClass: this.bortleClass,
      skyBrightness: this.skyBrightness
    });
  }

  onSave() {
    this.notifySave.emit(this.id);
  }

  onDelete() {
    this.notifyDelete.emit(this.id);
  }

  onHelp(section: string) {
    this.notifyHelp.emit(section);
  }

  constructor() { }

  ngOnInit() {
  }

}
