import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { UserObservatoryService, ObservatoryStored } from '@core/services';

@Component({
  selector: 'app-observatories-home',
  templateUrl: './observatories-home.component.html',
  styleUrls: ['./observatories-home.component.css']
})
export class ObservatoriesHomeComponent implements OnInit {
  browserTitle = 'Observatories | U235+SNR';
  pageTitle = 'Observatories';
  observatories = [];

  constructor(private titleService: Title, private router: Router, private observatoryService: UserObservatoryService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.observatories = this.observatoryService.getAll();
    this.observatories.sort((a: ObservatoryStored, b: ObservatoryStored) => a.name.localeCompare(b.name));
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

  onNew() {
    this.router.navigate(['/new-observatory']);
  }

  onEdit(id: number) {
    this.router.navigate(['/edit-observatory', id]);
  }

  onDelete(id: number) {
    this.router.navigate(['/delete-observatory', id]);
  }

}
