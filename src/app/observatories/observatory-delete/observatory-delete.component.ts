import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserObservatoryService, ObservatoryStored } from '../../services/user-observatory.service'

@Component({
  selector: 'app-observatory-delete',
  templateUrl: './observatory-delete.component.html',
  styleUrls: ['./observatory-delete.component.css']
})
export class ObservatoryDeleteComponent implements OnInit {
  observatory: ObservatoryStored = null;

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private router: Router, private observatoryService: UserObservatoryService) { }

  ngOnInit() {
    this.titleService.setTitle('Delete Observatory | U235+SNR');
    this.observatory = null;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        const result = this.observatoryService.getItem(idNum);
        if (result.length) {
          this.observatory = result[0];
        }
      }
    }
    if (!this.observatory) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.observatoryService.delete(
      this.observatory.id
    );
    this.router.navigate(['/observatories']);
  }

  onCancel() {
    this.router.navigate(['/observatories']);
  }

}
