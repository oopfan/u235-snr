import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTargetService, TargetStored, TargetParsed } from '../../services/user-target.service'

@Component({
  selector: 'app-target-edit',
  templateUrl: './target-edit.component.html',
  styleUrls: ['./target-edit.component.css']
})
export class TargetEditComponent implements OnInit {
  browserTitle = 'Edit Target | U235+SNR';
  pageTitle = 'Edit Target';
  notFound = 'Target not found';
  navigateToUrl = '/targets';

  target: TargetStored = {
    id: -1,
    name: '',
    surfaceBrightness: ''
  };

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private router: Router, private targetService: UserTargetService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        const result = this.targetService.getItem(idNum);
        if (result.length) {
          this.target = result[0];
          return;
        }
      }
    }
  }

  onSubmit(value: TargetParsed) {
    this.targetService.update(
      this.target.id,
      value.name,
      '' + value.surfaceBrightness
    );
    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }

}
