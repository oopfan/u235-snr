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
  @Output() notifyDeleteTarget:EventEmitter<number> = new EventEmitter();
  @Output() notifyUpdateTarget:EventEmitter<object> = new EventEmitter();
  calculatorButtonState = false;
  calculatorButtonText = 'Show Calculator';

  onChangeName(value: string) {
    this.name = value;
    this.emitUpdate();
  }

  onChangeSurfaceBrightness(value: string) {
    this.surfaceBrightness = value;
    this.emitUpdate();
  }

  private emitUpdate() {
    this.notifyUpdateTarget.emit({
      id: this.id,
      name: this.name,
      surfaceBrightness: this.surfaceBrightness
    });
  }

  onCalculatorButtonClick() {
    this.calculatorButtonState = !this.calculatorButtonState;
    if (this.calculatorButtonState) {
      this.calculatorButtonText = 'Hide Calculator';
    }
    else {
      this.calculatorButtonText = 'Show Calculator';
    }
  }

  onDeleteButtonClick() {
    this.notifyDeleteTarget.emit(this.id);
  }

  constructor() { }

  ngOnInit() {
  }

}
