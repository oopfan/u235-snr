import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

export interface TelescopeStored {
  id: number,
  name: string,
  aperture: string,
  focalLength: string,
  centralObstruction: string,
  totalReflectanceTransmittance: string
}

export interface TelescopeCache {
  nextid: number,
  list: Array<TelescopeStored>
}

export interface TelescopeParsed {
  id: number,
  name: string,
  aperture: number,
  focalLength: number,
  centralObstruction: number,
  totalReflectanceTransmittance: number
}

@Injectable({
  providedIn: 'root'
})
export class UserTelescopeService {
  cache: TelescopeCache = null;

  constructor(private storage: LocalStorageService) { }

  private init(): void {
    // get what is in local storage:
    const obj = this.storage.get('userTelescopes');
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
                if (!("aperture" in element) || typeof element.aperture !== 'string') {
                  isOK = false;
                }
                else {
                  if (!("focalLength" in element) || typeof element.focalLength !== 'string') {
                    isOK = false;
                  }
                  else {
                    if (!("centralObstruction" in element) || typeof element.centralObstruction !== 'string') {
                      isOK = false;
                    }
                    else {
                      if (!("totalReflectanceTransmittance" in element) || typeof element.totalReflectanceTransmittance !== 'string') {
                        isOK = false;
                      }
                    }
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

  backup(): TelescopeCache {
    if (!this.cache) {
      this.init();
    }
    return this.cache;
  }

  restore(value: TelescopeCache) {
    this.cache = null;
    this.storage.set('userTelescopes', value);
    this.init();
  }

  getAll(): Array<TelescopeStored> {
    if (!this.cache) {
      this.init();
    }
    return this.cache.list.map(item => Object.assign({}, item));
  }

  getItem(id: number): Array<TelescopeStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: TelescopeStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      return [ Object.assign({}, this.cache.list[index]) ];
    }
    return [];
  }

  create(name: string, aperture: string, focalLength: string, centralObstruction: string, totalReflectanceTransmittance: string): Array<TelescopeStored> {
    if (!this.cache) {
      this.init();
    }
    const id = this.cache.nextid++;
    const obj: TelescopeStored = { id, name, aperture, focalLength, centralObstruction, totalReflectanceTransmittance };
    this.cache.list.push(obj);
    this.storage.set('userTelescopes', this.cache);
    return [ Object.assign({}, obj) ];
  }

  update(id: number, name: string, aperture: string, focalLength: string, centralObstruction: string, totalReflectanceTransmittance: string): Array<TelescopeStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: TelescopeStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const obj: TelescopeStored = this.cache.list[index];
      obj.name = name;
      obj.aperture = aperture;
      obj.focalLength = focalLength;
      obj.centralObstruction = centralObstruction;
      obj.totalReflectanceTransmittance = totalReflectanceTransmittance;
      this.storage.set('userTelescopes', this.cache);
      return [ Object.assign({}, obj) ];
    }
    return [];
  }

  delete(id: number): Array<TelescopeStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: TelescopeStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const deleted = this.cache.list.splice(index, 1);
      this.storage.set('userTelescopes', this.cache);
      return deleted;
    }
    return [];
  }

  parseItems(items: Array<TelescopeStored>): Array<TelescopeParsed> {
    return items.map((item: TelescopeStored) => {
      return {
        id: item.id,
        name: item.name,
        aperture: parseFloat(item.aperture),
        focalLength: parseFloat(item.focalLength),
        centralObstruction: parseFloat(item.centralObstruction),
        totalReflectanceTransmittance: parseFloat(item.totalReflectanceTransmittance)
      }
    });
  }

  validate = (item: TelescopeParsed): boolean => {
    return (
      !isNaN(item.aperture) && item.aperture > 0 && 
      !isNaN(item.focalLength) && item.focalLength > 0 && 
      !isNaN(item.centralObstruction) && item.centralObstruction >= 0 &&
      !isNaN(item.totalReflectanceTransmittance) && item.totalReflectanceTransmittance >= 0 && item.totalReflectanceTransmittance <= 1 &&
      item.centralObstruction < item.aperture
      );
  }
}
