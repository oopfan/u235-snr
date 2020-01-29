import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  targetsCache = null;
  camerasCache = null;
  observatoriesCache = null;

  constructor(private storage: LocalStorageService) { }

  /*
  * BEGIN: TARGETS
  */
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
  /*
  * END: TARGETS
  */

  /*
  * BEGIN: CAMERAS
  */
  private initCameras() {
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
    this.camerasCache = isOK ? obj : { list: [], nextid: 0 };
  }

  discardCameras() {
    this.initCameras();
  }

  saveCameras() {
    if (!this.camerasCache) {
      this.initCameras();
    }
    this.storage.set('userCameras', this.camerasCache);
  }

  getAllCameras() {
    if (!this.camerasCache) {
      this.initCameras();
    }
    return this.camerasCache.list;
  }

  createCamera(name: string, pixelSize: string, readNoise:string, darkCurrent:string, quantumEfficiency:string) {
    if (!this.camerasCache) {
      this.initCameras();
    }
    const id = this.camerasCache.nextid++;
    const camera = { id, name, pixelSize, readNoise, darkCurrent, quantumEfficiency };
    this.camerasCache.list.unshift(camera);
    return [ camera ];
  }

  updateCamera(id: number, name: string, pixelSize: string, readNoise:string, darkCurrent:string, quantumEfficiency:string) {
    if (!this.camerasCache) {
      this.initCameras();
    }
    const index = this.camerasCache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      const camera = this.camerasCache.list[index];
      camera.name = name;
      camera.pixelSize = pixelSize;
      camera.readNoise = readNoise;
      camera.darkCurrent = darkCurrent;
      camera.quantumEfficiency = quantumEfficiency;
      this.camerasCache.list[index] = camera;
      return [ camera ];
    }
    return [];
  }

  deleteCamera(id: number) {
    if (!this.camerasCache) {
      this.initCameras();
    }
    const index = this.camerasCache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      return this.camerasCache.list.splice(index, 1);
    }
    return [];
  }
  /*
  * END: CAMERAS
  */

  /*
  * BEGIN: OBSERVATORIES
  */
  private initObservatories() {
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
    this.observatoriesCache = isOK ? obj : { list: [], nextid: 0 };
  }

  discardObservatories() {
    this.initObservatories();
  }

  saveObservatories() {
    if (!this.observatoriesCache) {
      this.initObservatories();
    }
    this.storage.set('userObservatories', this.observatoriesCache);
  }

  getAllObservatories() {
    if (!this.observatoriesCache) {
      this.initObservatories();
    }
    return this.observatoriesCache.list;
  }

  createObservatory(name: string, bortleClass: string, skyBrightness:string) {
    if (!this.observatoriesCache) {
      this.initObservatories();
    }
    const id = this.observatoriesCache.nextid++;
    const observatory = { id, name, bortleClass, skyBrightness };
    this.observatoriesCache.list.unshift(observatory);
    return [ observatory ];
  }

  updateObservatory(id: number, name: string, bortleClass: string, skyBrightness: string) {
    if (!this.observatoriesCache) {
      this.initObservatories();
    }
    const index = this.observatoriesCache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      const observatory = this.observatoriesCache.list[index];
      observatory.name = name;
      observatory.bortleClass = bortleClass;
      observatory.skyBrightness = skyBrightness;
      this.observatoriesCache.list[index] = observatory;
      return [ observatory ];
    }
    return [];
  }

  deleteObservatory(id: number) {
    if (!this.observatoriesCache) {
      this.initObservatories();
    }
    const index = this.observatoriesCache.list.findIndex((element: any) => {
      return element.id === id;
    });
    if (index >= 0) {
      return this.observatoriesCache.list.splice(index, 1);
    }
    return [];
  }
  /*
  * END: OBSERVATORIES
  */
}
