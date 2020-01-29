import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  targetsCache = null;

  constructor(private storage: LocalStorageService) { }

  saveTargets() {
    if (!this.targetsCache) {
      this.initTargets();
    }
    this.storage.set('userTargets', this.targetsCache);
  }

  discardTargets() {
    const obj = this.storage.get('userTargets');
    if (obj) {
      this.targetsCache = obj;
    }
  }

  getAllTargets() {
    if (!this.targetsCache) {
      this.initTargets();
    }
    return this.targetsCache.list;
  }

  private initTargets() {
    const obj = this.storage.get('userTargets');
    this.targetsCache = obj || { list: [], nextid: 0 };
  }

  createTarget(name: string, surfaceBrightness: string) {
    if (!this.targetsCache) {
      this.initTargets();
    }
    const id = this.targetsCache.nextid++;
    const target = { id, name, surfaceBrightness };
    this.targetsCache.list.unshift(target);
    return [ target ];
  }

  updateTarget(id: number, name: string, surfaceBrightness: string) {
    if (!this.targetsCache) {
      this.initTargets();
    }
    const index = this.targetsCache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      const target = this.targetsCache.list[index];
      target.name = name;
      target.surfaceBrightness = surfaceBrightness;
      this.targetsCache.list[index] = target;
      return [ target ];
    }
    return [];
  }

  deleteTarget(id: number) {
    if (!this.targetsCache) {
      this.initTargets();
    }
    const index = this.targetsCache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      return this.targetsCache.list.splice(index, 1);
    }
    return [];
  }

}
