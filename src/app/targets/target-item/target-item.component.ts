import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-target-item',
  templateUrl: './target-item.component.html',
  styleUrls: ['./target-item.component.css']
})
export class TargetItemComponent implements OnInit {
  @Input() id:number = 0;
  @Input() name:string = '';
  @Input() surfaceBrightness:string = '';
  @Output() notifyHelp:EventEmitter<string> = new EventEmitter();
  @Output() notifySave:EventEmitter<number> = new EventEmitter();
  @Output() notifyDelete:EventEmitter<number> = new EventEmitter();
  @Output() notifyUpdate:EventEmitter<object> = new EventEmitter();
  calculatorButtonState = false;
  calculatorButtonText = 'show calculator';

  onChangeName(value: string) {
    this.name = value;
    this.emitUpdate();
  }

  onChangeSurfaceBrightness(value: string) {
    this.surfaceBrightness = value;
    this.emitUpdate();
  }

  private emitUpdate() {
    this.notifyUpdate.emit({
      id: this.id,
      name: this.name,
      surfaceBrightness: this.surfaceBrightness
    });
  }

  onCalculatorClick() {
    this.calculatorButtonState = !this.calculatorButtonState;
    if (this.calculatorButtonState) {
      this.calculatorButtonText = 'hide calculator';
    }
    else {
      this.calculatorButtonText = 'show calculator';
    }
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
