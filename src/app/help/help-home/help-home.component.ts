import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help-home',
  templateUrl: './help-home.component.html',
  styleUrls: ['./help-home.component.css']
})
export class HelpHomeComponent implements OnInit {
  section: string = "all-sections";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const section = this.activatedRoute.snapshot.paramMap.get('section');
    if (section) {
      this.section = section;
    }
  }

}
