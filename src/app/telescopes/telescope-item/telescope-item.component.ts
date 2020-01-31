import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-telescope-item',
  templateUrl: './telescope-item.component.html',
  styleUrls: ['./telescope-item.component.css']
})
export class TelescopeItemComponent implements OnInit {
  @Input() id:number = 0;
  @Input() name:string = '';
  @Input() aperture:string = '';
  @Input() focalLength:string = '';
  @Input() centralObstruction:string = '';
  @Input() totalReflectanceTransmittance:string = '';
  @Output() notifySave:EventEmitter<number> = new EventEmitter();
  @Output() notifyDelete:EventEmitter<number> = new EventEmitter();
  @Output() notifyUpdate:EventEmitter<object> = new EventEmitter();

  onChangeName(value: string) {
    this.name = value;
    this.emitUpdate();
  }

  onChangeAperture(value: string) {
    this.aperture = value;
    this.emitUpdate();
  }

  onChangeFocalLength(value: string) {
    this.focalLength = value;
    this.emitUpdate();
  }

  onChangeCentralObstruction(value: string) {
    this.centralObstruction = value;
    this.emitUpdate();
  }

  onChangeTotalReflectanceTransmittance(value: string) {
    this.totalReflectanceTransmittance = value;
    this.emitUpdate();
  }

  private emitUpdate() {
    this.notifyUpdate.emit({
      id: this.id,
      name: this.name,
      aperture: this.aperture,
      focalLength: this.focalLength,
      centralObstruction: this.centralObstruction,
      totalReflectanceTransmittance: this.totalReflectanceTransmittance
    });
  }

  onSave() {
    this.notifySave.emit(this.id);
  }

  onDelete() {
    this.notifyDelete.emit(this.id);
  }

  constructor() { }

  ngOnInit() {
  }

}