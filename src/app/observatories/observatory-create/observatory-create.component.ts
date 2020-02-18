import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserObservatoryService, ObservatoryParsed } from '../../services/user-observatory.service'

@Component({
  selector: 'app-observatory-create',
  templateUrl: './observatory-create.component.html',
  styleUrls: ['./observatory-create.component.css']
})
export class ObservatoryCreateComponent implements OnInit {

  constructor(private titleService: Title, private observatoryService: UserObservatoryService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('New Observatory | U235+SNR');
  }

  onSubmit(value: ObservatoryParsed) {
    this.observatoryService.create(
      value.name,
      '' + value.bortleClass,
      '' + value.skyBrightness
    );
    this.router.navigate(['/observatories']);
  }

  onCancel() {
    this.router.navigate(['/observatories']);
  }

}
