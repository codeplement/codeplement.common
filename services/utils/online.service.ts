
import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GenericSubjects } from './generic-subjects.service';
import { interval, Subscription, from } from 'rxjs';
import { isOnline } from '@root/utils';

@Injectable()
export class OnlineService {
    private onlineStatus$: Subject<boolean>;
    private maxInterval = 60;
    private interval = 1000;
    private intervalValue = 10;
    private intervalSubscription: Subscription;
    private nextIntervalToWait$: Subject<number>;

    constructor(genericSubjects: GenericSubjects, private zone: NgZone) {
        this.onlineStatus$ = genericSubjects.add<boolean>('onlineStatus$');
        this.nextIntervalToWait$ = new Subject<number>();
        this.startWorker();
    }

    public isOnline(): Observable<boolean> {
        return this.onlineStatus$.asObservable();
    }

    private startWorker() {
        this.intervalSubscription = interval(this.interval).subscribe((int) => {
            this.nextIntervalToWait$.next(this.intervalValue - int);
            if (int === 1 || (int > 0 && int === this.intervalValue)) {
                this.intervalSubscription.unsubscribe();
                from(isOnline()).subscribe((res) => {
                    this.onlineStatus$.next(res);
                    if (this.intervalValue < this.maxInterval) {
                        this.intervalValue += 10;
                    }
                    this.startWorker();
                });
            }
        });
    }
}