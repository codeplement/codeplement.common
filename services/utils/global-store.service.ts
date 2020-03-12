import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalStoreService {
  private store: {
    [x: string]: any;
  } = {};
  constructor() {}

  get(name: string | number) {
    return this.store[name];
  }

  set(name: string | number, value: any) {
    this.store[name] = value;
  }
}
