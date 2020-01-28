import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  targetsCache = null;

  constructor() { }

  getAllTargets() {
    if (!this.targetsCache) {
      this.initTargets();
    }
    return this.targetsCache.list;
  }

  private initTargets() {
    this.targetsCache = { list: [], nextid: 0 };
    this.targetsCache.list = [
      { id: 0, name: 'M51 Whirlpool Galaxy', surfaceBrightness: '21.7'},
      { id: 1, name: 'M82 Cigar Galaxy', surfaceBrightness: '21.2'}
    ];
    this.targetsCache.nextid = this.targetsCache.list.length;
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
