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
  @Output() notifyDeleteObservatory:EventEmitter<number> = new EventEmitter();
  @Output() notifyUpdateObservatory:EventEmitter<object> = new EventEmitter();

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
    this.notifyUpdateObservatory.emit({
      id: this.id,
      name: this.name,
      bortleClass: this.bortleClass,
      skyBrightness: this.skyBrightness
    });
  }

  onDeleteButtonClick() {
    this.notifyDeleteObservatory.emit(this.id);
  }

  constructor() { }

  ngOnInit() {
  }

}
