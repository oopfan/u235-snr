import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTargetService, TargetStored } from '@core/services';

@Component({
  selector: 'app-target-delete',
  templateUrl: './target-delete.component.html',
  styleUrls: ['./target-delete.component.css']
})
export class TargetDeleteComponent implements OnInit {
  pageTitle = 'Delete Target';
  browserTitle = this.pageTitle + ' | U235+SNR';
  notFound = 'Target not found';
  navigateToUrl = '/targets';

  target: TargetStored = {
    id: -1,
    name: '',
    surfaceBrightness: '',
    rightAscension: 0,
    declination: 0
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

  onSubmit() {
    this.targetService.delete(
      this.target.id
    );
    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }

}
