import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

export interface TargetStored {
  id: number,
  name: string,
  surfaceBrightness: string,
  rightAscension: number,
  declination: number
}

export interface TargetCache {
  nextid: number,
  list: Array<TargetStored>
}

export interface TargetParsed {
  id: number,
  name: string,
  surfaceBrightness: number,
  rightAscension: number,
  declination: number
}

@Injectable({
  providedIn: 'root'
})
export class UserTargetService {
  cache: TargetCache = null;

  constructor(private storage: LocalStorageService) { }

  static validateStorage(obj: TargetCache): boolean {
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
    return isOK;
  }

  private init() {
    const obj = this.storage.get('userTargets');
    const isOK = UserTargetService.validateStorage(obj);
    this.cache = { list: [], nextid: 0 };
    if (isOK) {
      let maxid = 0;
      const newList: Array<TargetStored> = obj.list.map(element => {
        if (element.id > maxid) {
          maxid = element.id;
        }
        const newElement: TargetStored = {
          id: element.id,
          name: element.name,
          surfaceBrightness: element.surfaceBrightness,
          rightAscension: element.rightAscension || 1,
          declination: element.declination || 1
        };
        return newElement;
      });
      this.cache.list = newList;
      this.cache.nextid = maxid + 1;
    }
  }

  backup(): TargetCache {
    if (!this.cache) {
      this.init();
    }
    return this.cache;
  }

  restore(value: TargetCache) {
    this.storage.set('userTargets', value);
    this.init();
  }

  getAll(): Array<TargetStored> {
    if (!this.cache) {
      this.init();
    }
    return this.cache.list.map(item => Object.assign({}, item));
  }

  getItem(id: number): Array<TargetStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: TargetStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      return [ Object.assign({}, this.cache.list[index]) ];
    }
    return [];
  }

  create(name: string, surfaceBrightness: string, rightAscension: number, declination: number) {
    if (!this.cache) {
      this.init();
    }
    const id = this.cache.nextid++;
    const obj: TargetStored = { id, name, surfaceBrightness, rightAscension, declination };
    this.cache.list.push(obj);
    this.storage.set('userTargets', this.cache);
    return [ Object.assign({}, obj) ];
  }

  update(id: number, name: string, surfaceBrightness: string, rightAscension: number, declination: number) {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: TargetStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const obj: TargetStored = this.cache.list[index];
      obj.name = name;
      obj.surfaceBrightness = surfaceBrightness;
      obj.rightAscension = rightAscension;
      obj.declination = declination;
      this.storage.set('userTargets', this.cache);
      return [ Object.assign({}, obj) ];
    }
    return [];
  }

  delete(id: number): Array<TargetStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: TargetStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const deleted = this.cache.list.splice(index, 1);
      this.storage.set('userTargets', this.cache);
      return deleted;
    }
    return [];
  }

  parseItems = (items: Array<TargetStored>): Array<TargetParsed> => {
    return items.map((item: TargetStored) => {
      return {
        id: item.id,
        name: item.name,
        surfaceBrightness: parseFloat(item.surfaceBrightness),
        rightAscension: item.rightAscension,
        declination: item.declination
      }
    });
  }

  validate = (item: TargetParsed): boolean => {
    return !isNaN(item.surfaceBrightness);
  }
}
