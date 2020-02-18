import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTargetService, TargetParsed } from '../../services/user-target.service'

@Component({
  selector: 'app-target-create',
  templateUrl: './target-create.component.html',
  styleUrls: ['./target-create.component.css']
})
export class TargetCreateComponent implements OnInit {

  constructor(private titleService: Title, private targetService: UserTargetService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('New Target | U235+SNR');
  }

  onSubmit(value: TargetParsed) {
    this.targetService.create(
      value.name,
      '' + value.surfaceBrightness
    );
    this.router.navigate(['/targets']);
  }

  onCancel() {
    this.router.navigate(['/targets']);
  }

}
