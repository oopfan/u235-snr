import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getAllTargets() {
    return [
      { name: 'M51 Whirlpool Galaxy', surfaceBrightness: '21.7'},
      { name: 'M82 Cigar Galaxy', surfaceBrightness: '21.2'}
    ]
  }
}
