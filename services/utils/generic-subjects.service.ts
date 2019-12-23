import { Injectable } from '@angular/core';
import { Subject, PartialObserver } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GenericSubjects {
    private subjects$: {
        [x: string]: Subject<any>;
    };
    constructor() { }

    public get<T>(name: string): Subject<T> {
        const sub = this.subjects$[name] as Subject<T>;
        if (!sub) {
            throw new Error('Subject not registered');
        }
        return sub;
    }

    add<T>(name: string): Subject<T> {
        this.subjects$[name] = this.subjects$[name] || new Subject<T>();
        return this.subjects$[name] as Subject<T>;
    }

    registerCommonSubjects(): void {
        this.add<boolean>('authenticationStatus$');
        this.add<boolean>('onlineStatus$');
        this.add<boolean>('noDataFoundStatus$');
    }
}