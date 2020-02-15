import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-item',
  templateUrl: './camera-item.component.html',
  styleUrls: ['./camera-item.component.css']
})
export class CameraItemComponent implements OnInit {
  @Input() id:number = 0;
  @Input() name:string = '';
  @Input() pixelSize:string = '';
  @Input() readNoise:string = '';
  @Input() darkCurrent:string = '';
  @Input() quantumEfficiency:string = '';
  @Output() notifyHelp:EventEmitter<string> = new EventEmitter();
  @Output() notifySave:EventEmitter<number> = new EventEmitter();
  @Output() notifyDelete:EventEmitter<number> = new EventEmitter();
  @Output() notifyUpdate:EventEmitter<object> = new EventEmitter();

  onChangeName(value: string) {
    this.name = value;
    this.emitUpdate();
  }

  onChangePixelSize(value: string) {
    this.pixelSize = value;
    this.emitUpdate();
  }

  onChangeReadNoise(value: string) {
    this.readNoise = value;
    this.emitUpdate();
  }

  onChangeDarkCurrent(value: string) {
    this.darkCurrent = value;
    this.emitUpdate();
  }

  onChangeQuantumEfficiency(value: string) {
    this.quantumEfficiency = value;
    this.emitUpdate();
  }

  private emitUpdate() {
    this.notifyUpdate.emit({
      id: this.id,
      name: this.name,
      pixelSize: this.pixelSize,
      readNoise: this.readNoise,
      darkCurrent: this.darkCurrent,
      quantumEfficiency: this.quantumEfficiency
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
