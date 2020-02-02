import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserTelescopeService {
  cache = null;

  constructor(private storage: LocalStorageService) { }

  private init() {
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

  discard() {
    this.init();
  }

  sort() {
    if (!this.cache) {
      this.init();
    }
    this.cache.list.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.storage.set('userTelescopes', this.cache);
  }

  saveAll() {
    if (!this.cache) {
      this.init();
    }
    this.storage.set('userTelescopes', this.cache);
  }

  getAll() {
    if (!this.cache) {
      this.init();
    }
    return this.cache.list;
  }

  getItem(id: string) {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: any) => {
      return element.id == id;
    });
    if (index >= 0) {
      const obj = this.cache.list[index];
      return [ obj ];
    }
    return [];
  }

  parseItems(items: any) {
    return items.map((item: any) => {
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

  validate = (item: any) => {
    return (
      !isNaN(item.aperture) && item.aperture > 0 && 
      !isNaN(item.focalLength) && item.focalLength > 0 && 
      !isNaN(item.centralObstruction) && item.centralObstruction >= 0 &&
      !isNaN(item.totalReflectanceTransmittance) && item.totalReflectanceTransmittance >= 0 && item.totalReflectanceTransmittance <= 1
      );
  }

  create(name: string, aperture: string, focalLength: string, centralObstruction: string, totalReflectanceTransmittance: string) {
    if (!this.cache) {
      this.init();
    }
    const id = this.cache.nextid++;
    const obj = { id, name, aperture, focalLength, centralObstruction, totalReflectanceTransmittance };
    this.cache.list.unshift(obj);
    return [ obj ];
  }

  update(id: number, name: string, aperture: string, focalLength: string, centralObstruction: string, totalReflectanceTransmittance: string) {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      const obj = this.cache.list[index];
      obj.name = name;
      obj.aperture = aperture;
      obj.focalLength = focalLength;
      obj.centralObstruction = centralObstruction;
      obj.totalReflectanceTransmittance = totalReflectanceTransmittance;
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
