import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  targetsCache = null;

  constructor(private storage: LocalStorageService) { }

  private initTargets() {
    // get what is in local storage:
    const obj = this.storage.get('userTargets');
    // make sure its structure is compatible with downstream code:
    let isOK = true;
    if (!obj) {
      isOK = false;
    }
    else {
      if (!("nextid" in obj) || typeof obj.nextid !== 'number' || !isFinite(obj.nextid)) {
        isOK = false;
      }
      else {
        if (!("list" in obj) || !Array.isArray(obj.list)) {
          isOK = false;
        }
        else {
          obj.list.forEach((element: any) => {
            if (typeof element !== 'object') {
              isOK = false;
            }
            else {
              if (!("name" in element) || typeof element.name !== 'string') {
                isOK = false;
              }
              else {
                if (!("surfaceBrightness" in element) || typeof element.surfaceBrightness !== 'string') {
                  isOK = false;
                }
              }
            }
          });
        }
      }
    }
    this.targetsCache = isOK ? obj : { list: [], nextid: 0 };
  }

  discardTargets() {
    this.initTargets();
  }

  saveTargets() {
    if (!this.targetsCache) {
      this.initTargets();
    }
    this.storage.set('userTargets', this.targetsCache);
  }

  getAllTargets() {
    if (!this.targetsCache) {
      this.initTargets();
    }
    return this.targetsCache.list;
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
