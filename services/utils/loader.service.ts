import { Injectable } from '@angular/core';
import { Subject, PartialObserver } from 'rxjs';

export class Loader {
    private static pDefault: Loader;
    name: string;
    private loaderState$: Subject<boolean>;
    constructor(name: string, observer: PartialObserver<boolean>) {
        this.loaderState$ = new Subject<boolean>();
        this.loaderState$.subscribe(observer);
        this.name = name;
    }
    public addSubscription(observer: PartialObserver<boolean>) {
        this.loaderState$.subscribe(observer);
    }
    public unSubscribe() {
        this.loaderState$.unsubscribe();
    }
    public show() {
        this.loaderState$.next(true);
    }

    public hide() {
        this.loaderState$.next(false);
    }
    public static get default(): Loader {
        if (Loader.pDefault != null) {
            return Loader.pDefault;
        } else {
            Loader.pDefault = new Loader('@default', {
                next: (val) => {
                    const docLoader = document.getElementById('#default-loader');
                    if (docLoader) {
                        docLoader.style.display = val ? 'block' : 'none';
                        docLoader.style.zIndex = val ? '99999' : '-1';
                    }
                }
            });
        }
        return Loader.pDefault;
    }
}

@Injectable()
export class LoaderRegistrationService {
    readonly loaders: {
        [key: string]: Loader;
    } = {};
    constructor() {

    }

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
