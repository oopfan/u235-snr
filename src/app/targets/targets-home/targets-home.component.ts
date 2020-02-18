import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { UserTargetService, TargetStored } from 'src/app/services/user-target.service';

@Component({
  selector: 'app-targets-home',
  templateUrl: './targets-home.component.html',
  styleUrls: ['./targets-home.component.css']
})
export class TargetsHomeComponent implements OnInit {
  targets = [];

  constructor(private titleService: Title, private router: Router, private targetService: UserTargetService) { }

  ngOnInit() {
    this.titleService.setTitle('Targets | U235+SNR');
    this.targets = this.targetService.getAll();
    this.targets.sort((a: TargetStored, b: TargetStored) => a.name.localeCompare(b.name));
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

  onNew() {
    this.router.navigate(['/new-target']);
  }

  onEdit(id: number) {
    this.router.navigate(['/edit-target', id]);
  }

  onDelete(id: number) {
    this.router.navigate(['/delete-target', id]);
  }

}
