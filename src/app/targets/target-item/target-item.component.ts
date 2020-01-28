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
  calculatorButtonState = false;
  calculatorButtonText = 'SHOW CALCULATOR';

  onCalculatorButtonClick() {
    this.calculatorButtonState = !this.calculatorButtonState;
    if (this.calculatorButtonState) {
      this.calculatorButtonText = 'HIDE CALCULATOR';
    }
    else {
      this.calculatorButtonText = 'SHOW CALCULATOR';
    }
  }

  onDeleteButtonClick() {
    this.notifyDeleteTarget.emit(this.id);
  }

  constructor() { }

  ngOnInit() {
  }

}
