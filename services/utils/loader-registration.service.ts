import { Injectable } from '@angular/core';
import { PartialObserver } from 'rxjs';
import { Loader } from './loader.service';
@Injectable()
export class LoaderRegistrationService {
  readonly loaders: {
    [key: string]: Loader;
  } = {};
  constructor() {}
  register(name: string, observer: PartialObserver<boolean>) {
    const loader = this.loaders[name];
    if (loader == null) {
      this.loaders[name] = new Loader(name, observer);
    } else {
      loader.addSubscription(observer);
    }
  }
  unregister(name): void {
    const loader = this.loaders[name];
    if (loader) {
      loader.unSubscribe();
      delete this.loaders[name];
    }
  }
  get(name: string): Loader {
    const loader = this.loaders[name];
    if (loader != null) {
      return loader;
    }
    return Loader.default;
  }
}
