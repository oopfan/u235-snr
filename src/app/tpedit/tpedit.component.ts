import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-tpedit',
  templateUrl: './tpedit.component.html',
  styleUrls: ['./tpedit.component.css']
})
export class TpeditComponent implements OnInit {
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
