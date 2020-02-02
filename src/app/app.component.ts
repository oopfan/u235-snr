import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  localStorageCheck = true;

  constructor() {}

  checkStorage() {
    // Thanks @ashaffer88 for supports-localstorage
    const storageName = 'localStorage';
    const testKey = 'supports-localStorage_test';
    if ('undefined' !== typeof window) {
      try {
        var storage = window[storageName];
        if (storage) {
          storage.setItem(testKey, 'OK');
          storage.removeItem(testKey)
          this.localStorageCheck = true
        }
        else {
          this.localStorageCheck = false
        }
      }
      catch (error) {
        this.localStorageCheck = false;
      }
    }
    else {
      this.localStorageCheck = false
    }
  }

  ngOnInit() {
    this.checkStorage();
  }
}
