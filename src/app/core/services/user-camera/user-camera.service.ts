import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

export interface CameraStored {
  id: number,
  name: string,
  pixelSize: string,
  readNoise: string,
  darkCurrent: string,
  quantumEfficiency: string
}

export interface CameraCache {
  nextid: number,
  list: Array<CameraStored>
}

export interface CameraParsed {
  id: number,
  name: string,
  pixelSize: number,
  readNoise: number,
  darkCurrent: number,
  quantumEfficiency: number
}

@Injectable({
  providedIn: 'root'
})
export class UserCameraService {
  cache: CameraCache = null;

  constructor(private storage: LocalStorageService) { }

  static validateStorage(obj: CameraCache): boolean {
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
    return isOK;
  }

  private init() {
    const obj = this.storage.get('userCameras');
    const isOK = UserCameraService.validateStorage(obj);
    this.cache = { list: [], nextid: 0 };
    if (isOK) {
      let maxid = 0;
      const newList: Array<CameraStored> = obj.list.map(element => {
        if (element.id > maxid) {
          maxid = element.id;
        }
        const newElement: CameraStored = {
          id: element.id,
          name: element.name,
          pixelSize: element.pixelSize,
          readNoise: element.readNoise,
          darkCurrent: element.darkCurrent,
          quantumEfficiency: element.quantumEfficiency
        };
        return newElement;
      });
      this.cache.list = newList;
      this.cache.nextid = maxid + 1;
    }
  }

  backup(): CameraCache {
    if (!this.cache) {
      this.init();
    }
    return this.cache;
  }

  restore(value: CameraCache) {
    this.storage.set('userCameras', value);
    this.init();
  }

  getAll(): Array<CameraStored> {
    if (!this.cache) {
      this.init();
    }
    return this.cache.list.map<CameraStored>(item => Object.assign({}, item));
  }

  getItem(id: number): Array<CameraStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: CameraStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      return [ Object.assign({}, this.cache.list[index]) ];
    }
    return [];
  }

  create(name: string, pixelSize: string, readNoise:string, darkCurrent:string, quantumEfficiency:string): Array<CameraStored> {
    if (!this.cache) {
      this.init();
    }
    const id = this.cache.nextid++;
    const obj: CameraStored = { id, name, pixelSize, readNoise, darkCurrent, quantumEfficiency };
    this.cache.list.push(obj);
    this.storage.set('userCameras', this.cache);
    return [ Object.assign({}, obj) ];
  }

  update(id: number, name: string, pixelSize: string, readNoise:string, darkCurrent:string, quantumEfficiency:string): Array<CameraStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: CameraStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const obj: CameraStored = this.cache.list[index];
      obj.name = name;
      obj.pixelSize = pixelSize;
      obj.readNoise = readNoise;
      obj.darkCurrent = darkCurrent;
      obj.quantumEfficiency = quantumEfficiency;
      this.storage.set('userCameras', this.cache);
      return [ Object.assign({}, obj) ];
    }
    return [];
  }

  delete(id: number): Array<CameraStored> {
    if (!this.cache) {
      this.init();
    }
    const index = this.cache.list.findIndex((element: CameraStored) => {
      return element.id === id;
    });
    if (index >= 0) {
      const deleted = this.cache.list.splice(index, 1);
      this.storage.set('userCameras', this.cache);
      return deleted;
    }
    return [];
  }

  parseItems(items: Array<CameraStored>): Array<CameraParsed> {
    return items.map((item: CameraStored) => {
      return {
        id: item.id,
        name: item.name,
        pixelSize: parseFloat(item.pixelSize),
        readNoise: parseFloat(item.readNoise),
        darkCurrent: parseFloat(item.darkCurrent),
        quantumEfficiency: parseFloat(item.quantumEfficiency)
      }
    });
  }

  validate = (item: CameraParsed): boolean => {
    return (
      !isNaN(item.pixelSize) && item.pixelSize > 0 &&
      !isNaN(item.readNoise) && item.readNoise >= 0 &&
      !isNaN(item.darkCurrent) && item.darkCurrent >= 0 &&
      !isNaN(item.quantumEfficiency) && item.quantumEfficiency >= 0 && item.quantumEfficiency <= 100
    );
  }
}
