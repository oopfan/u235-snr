import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTargetService, TargetStored } from '../../services/user-target.service'

@Component({
  selector: 'app-target-delete',
  templateUrl: './target-delete.component.html',
  styleUrls: ['./target-delete.component.css']
})
export class TargetDeleteComponent implements OnInit {
  target: TargetStored = {
    id: -1,
    name: '',
    surfaceBrightness: ''
  };

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private router: Router, private targetService: UserTargetService) { }

  ngOnInit() {
    this.titleService.setTitle('Delete Target | U235+SNR');
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
    this.router.navigate(['/targets']);
  }

  onCancel() {
    this.router.navigate(['/targets']);
  }

}
