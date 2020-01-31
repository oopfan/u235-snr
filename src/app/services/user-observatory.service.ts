import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserObservatoryService {
  cache = null;

  constructor(private storage: LocalStorageService) { }

  private init() {
    // get what is in local storage:
    const obj = this.storage.get('userObservatories');
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
                if (!("bortleClass" in element) || typeof element.bortleClass !== 'string') {
                  isOK = false;
                }
                else {
                  if (!("skyBrightness" in element) || typeof element.skyBrightness !== 'string') {
                    isOK = false;
                  }
                }
              }
            }
          });
        }
      }
    }
    this.cache = isOK ? obj : { list: [], nextid: 0 };
  }

  discard() {
    this.init();
  }

  saveAll() {
    if (!this.cache) {
      this.init();
    }
    this.storage.set('userObservatories', this.cache);
  }

  getAll() {
    if (!this.cache) {
      this.init();
    }
    return this.cache.list;
  }

  create(name: string, bortleClass: string, skyBrightness:string) {
    if (!this.cache) {
      this.init();
    }
    const id = this.cache.nextid++;
    const obj = { id, name, bortleClass, skyBrightness };
    this.cache.list.unshift(obj);
    return [ obj ];
  }

  update(id: number, name: string, bortleClass: string, skyBrightness: string) {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      const obj = this.cache.list[index];
      obj.name = name;
      obj.bortleClass = bortleClass;
      obj.skyBrightness = skyBrightness;
      this.cache.list[index] = obj;
      return [ obj ];
    }
    return [];
  }

  delete(id: number) {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      return this.cache.list.splice(index, 1);
    }
    return [];
  }
}
