import { Component, OnInit } from '@angular/core';
import { LocalStorageGuard } from '@core/services';

@Component({
  selector: 'app-errors-home',
  templateUrl: './errors-home.component.html',
  styleUrls: ['./errors-home.component.css']
})
export class ErrorsHomeComponent implements OnInit {

  localStorageOK = true;

  constructor() { }

  ngOnInit() {
    this.localStorageOK = LocalStorageGuard.checkStorage();
  }

}
