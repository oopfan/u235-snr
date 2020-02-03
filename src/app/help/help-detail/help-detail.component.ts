import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help-detail',
  templateUrl: './help-detail.component.html',
  styleUrls: ['./help-detail.component.css']
})
export class HelpDetailComponent implements OnInit {
  @Input() section: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const section = this.activatedRoute.snapshot.paramMap.get('section');
    if (section) {
      this.section = section;
    }
  }

}
