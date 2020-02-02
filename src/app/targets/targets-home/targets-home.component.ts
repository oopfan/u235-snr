import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserTargetService } from 'src/app/services/user-target.service';

@Component({
  selector: 'app-targets-home',
  templateUrl: './targets-home.component.html',
  styleUrls: ['./targets-home.component.css']
})
export class TargetsHomeComponent implements OnInit {

  constructor(private titleService: Title, private targetService: UserTargetService) { }

  targets = [];

  ngOnInit() {
    this.titleService.setTitle('Targets | U235+SNR');
    this.targets = this.targetService.getAll();
  }

  onNew() {
    this.targetService.create('', '');
    this.targets = this.targetService.getAll();
  }

  onSaveAll() {
    this.targetService.saveAll();
  }

  onDiscard() {
    this.targetService.discard();
    this.targets = this.targetService.getAll();
  }

  onUpdate(target: any) {
    this.targetService.update(target.id, target.name, target.surfaceBrightness);
  }

  onDelete(id: number) {
    this.targetService.delete(id);
    this.targets = this.targetService.getAll();
  }

  onSave(id: number) {
    // Right now, can't save an individual target to Local Storage, just all targets.
    this.targetService.saveAll();
  }

}
