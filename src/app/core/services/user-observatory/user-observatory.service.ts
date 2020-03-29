import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

export interface ObservatoryStored {
  id: number,
  name: string,
  bortleClass: string,
  skyBrightness: string,
  latitude: number,
  longitude: number
}

export interface ObservatoryCache {
  nextid: number,
  list: Array<ObservatoryStored>
}

export interface ObservatoryParsed {
  id: number,
  name: string,
  bortleClass: string,
  skyBrightness: number,
  latitude: number,
  longitude: number
}

@Injectable({
  providedIn: 'root'
})
export class UserObservatoryService {
  cache: ObservatoryCache = null;

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
    if (!isOK) {
      this.cache = { list: [], nextid: 0 };
      return;
    }
    this.cache = obj;
    const newList: Array<ObservatoryStored> = this.cache.list.map(element => {
      const newElement: ObservatoryStored = {
        id: element.id,
        name: element.name,
        bortleClass: element.bortleClass,
        skyBrightness: element.skyBrightness,
        latitude: element.latitude || 1,
        longitude: element.longitude || 1
      };
      return newElement;
    });
    this.cache.list = newList;
  }

  backup(): ObservatoryCache {
    if (!this.cache) {
      this.init();
    }
    return this.cache;
  }

  restore(value: ObservatoryCache) {
    this.cache = null;
    this.storage.set('userObservatories', value);
    this.init();
  }

  getAll(): Array<ObservatoryStored> {
    if (!this.cache) {
      this.init();
    }
    return this.cache.list.map<ObservatoryStored>(item => Object.assign({}, item));
  }

  getItem(id: number): Array<ObservatoryStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: ObservatoryStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      return [ Object.assign({}, this.cache.list[index]) ];
    }
    return [];
  }

  create(name: string, bortleClass: string, skyBrightness: string, latitude: number, longitude: number): Array<ObservatoryStored> {
    if (!this.cache) {
      this.init();
    }
    const id = this.cache.nextid++;
    const obj: ObservatoryStored = { id, name, bortleClass, skyBrightness, latitude, longitude };
    this.cache.list.push(obj);
    this.storage.set('userObservatories', this.cache);
    return [ Object.assign({}, obj) ];
  }

  update(id: number, name: string, bortleClass: string, skyBrightness: string, latitude: number, longitude: number): Array<ObservatoryStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: ObservatoryStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const obj: ObservatoryStored = this.cache.list[index];
      obj.name = name;
      obj.bortleClass = bortleClass;
      obj.skyBrightness = skyBrightness;
      obj.latitude = latitude;
      obj.longitude = longitude;
      this.storage.set('userObservatories', this.cache);
      return [ Object.assign({}, obj) ];
    }
    return [];
  }

  delete(id: number): Array<ObservatoryStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: ObservatoryStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const deleted = this.cache.list.splice(index, 1);
      this.storage.set('userObservatories', this.cache);
      return deleted;
    }
    return [];
  }

  parseItems(items: Array<ObservatoryStored>): Array<ObservatoryParsed> {
    return items.map((item: ObservatoryStored) => {
      return {
        id: item.id,
        name: item.name,
        bortleClass: item.bortleClass,
        skyBrightness: parseFloat(item.skyBrightness),
        latitude: item.latitude,
        longitude: item.longitude
      }
    });
  }

  validate = (item: ObservatoryParsed): boolean => {
    return (
      !isNaN(item.skyBrightness)
    );
  }
}
