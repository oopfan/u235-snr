import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserObservatoryService } from 'src/app/services/user-observatory.service';

@Component({
  selector: 'app-observatories-home',
  templateUrl: './observatories-home.component.html',
  styleUrls: ['./observatories-home.component.css']
})
export class ObservatoriesHomeComponent implements OnInit {

  constructor(private titleService: Title, private observatoryService: UserObservatoryService) { }

  observatories = [];

  ngOnInit() {
    this.titleService.setTitle('Observatories | U235+SNR');
    this.observatoryService.sort();
    this.observatories = this.observatoryService.getAll();
  }

  onNew() {
    this.observatoryService.create('', '', '');
    this.observatories = this.observatoryService.getAll();
  }

  onSaveAll() {
    this.observatoryService.saveAll();
  }

  onDiscard() {
    this.observatoryService.discard();
    this.observatories = this.observatoryService.getAll();
  }

  onUpdate(observatory: any) {
    this.observatoryService.update(observatory.id, observatory.name, observatory.bortleClass, observatory.skyBrightness);
  }

  onDelete(id: number) {
    this.observatoryService.delete(id);
    this.observatories = this.observatoryService.getAll();
  }

  onSave(id: number) {
    // Right now, can't save an individual observatory to Local Storage, just all observatories.
    this.observatoryService.saveAll();
  }

}
