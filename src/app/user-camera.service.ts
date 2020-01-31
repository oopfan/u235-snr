import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserCameraService {
  cache = null;

  constructor(private storage: LocalStorageService) { }

  private init() {
    // get what is in local storage:
    const obj = this.storage.get('userCameras');
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
                if (!("pixelSize" in element) || typeof element.pixelSize !== 'string') {
                  isOK = false;
                }
                else {
                  if (!("readNoise" in element) || typeof element.readNoise !== 'string') {
                    isOK = false;
                  }
                  else {
                    if (!("darkCurrent" in element) || typeof element.darkCurrent !== 'string') {
                      isOK = false;
                    }
                    else {
                      if (!("quantumEfficiency" in element) || typeof element.quantumEfficiency !== 'string') {
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

  saveAll() {
    if (!this.cache) {
      this.init();
    }
    this.storage.set('userCameras', this.cache);
  }

  getAll() {
    if (!this.cache) {
      this.init();
    }
    return this.cache.list;
  }

  create(name: string, pixelSize: string, readNoise:string, darkCurrent:string, quantumEfficiency:string) {
    if (!this.cache) {
      this.init();
    }
    const id = this.cache.nextid++;
    const obj = { id, name, pixelSize, readNoise, darkCurrent, quantumEfficiency };
    this.cache.list.unshift(obj);
    return [ obj ];
  }

  update(id: number, name: string, pixelSize: string, readNoise:string, darkCurrent:string, quantumEfficiency:string) {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      const obj = this.cache.list[index];
      obj.name = name;
      obj.pixelSize = pixelSize;
      obj.readNoise = readNoise;
      obj.darkCurrent = darkCurrent;
      obj.quantumEfficiency = quantumEfficiency;
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
