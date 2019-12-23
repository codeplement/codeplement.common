
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@root/services/storage';
import { IPendingRequest } from '@root/models/utils/pending-request';
import { Subject } from 'rxjs';
import { ObservableArray } from '@root/utils/observable-array';
@Injectable({
    providedIn: 'root'
})
export class PendingRequestService {
    [n: number]: IPendingRequest;
    length: number;
    private requestArray: ObservableArray<IPendingRequest>;
    public requestAdded$: Subject<{ type: 'removed' | 'added' | 'sorted' }>;
    constructor(private storage: LocalStorageService) {
        this.requestArray = this.storage.getObject('pending-request') || [];
        this.requestAdded$ = new Subject<IPendingRequest | IPendingRequest[]>();
    }
    private onRequestArrayChanged(value: IPendingRequest) {
        this.storage.set('pending-request', this.requestArray);
        this.requestAdded$.next(value || this.requestArray);
    }
    public get requests() {
        return this.requestArray;
    }
    pop(): IPendingRequest {
        const popped = this.requestArray.pop();
        this.onRequestArrayChanged()
        return popped;
    }

    push(...items: IPendingRequest[]): number {
        return this.requestArray.push(...items);
    }

    shift(): IPendingRequest {
        return this.requestArray.shift();
    }
    slice(start?: number, end?: number): IPendingRequest[] {
        return this.requestArray.slice(start, end);
    }
    sort(compareFn?: (a: IPendingRequest, b: IPendingRequest) => number): this {
        this.requestArray.sort(compareFn);
        return this;
    }

    splice(start: number, deleteCount?: number, ...items: IPendingRequest[]): IPendingRequest[] {
        return this.requestArray.splice(start, deleteCount, ...items);
    }

    unshift(...items: IPendingRequest[]): number {
        return this.requestArray.unshift(...items);
    }

    indexOf(searchElement: IPendingRequest, fromIndex?: number): number {
        return this.requestArray.indexOf(searchElement, fromIndex);
    }

    lastIndexOf(searchElement: IPendingRequest, fromIndex?: number): number {
        return this.requestArray.lastIndexOf(searchElement, fromIndex);
    }
    every(callbackfn: (value: IPendingRequest, index: number, array: IPendingRequest[]) => unknown, thisArg?: any): boolean {
        return this.requestArray.every(callbackfn);
    }
    some(callbackfn: (value: IPendingRequest, index: number, array: IPendingRequest[]) => unknown, thisArg?: any): boolean {
        return this.requestArray.some(callbackfn);
    }
    forEach(callbackfn: (value: IPendingRequest, index: number, array: IPendingRequest[]) => void, thisArg?: any): void {
        this.requestArray.forEach(callbackfn);
    }
    map<U>(callbackfn: (value: IPendingRequest, index: number, array: IPendingRequest[]) => U, thisArg?: any): U[] {
        return this.requestArray.map(callbackfn);
    }
    filter<S extends IPendingRequest>(callbackfn: (value: IPendingRequest, index: number, array: IPendingRequest[]) => value is S, thisArg?: any): S[] {
        return this.requestArray.filter(callbackfn);
    }

    reduce(callbackfn: (previousValue: IPendingRequest, currentValue: IPendingRequest, currentIndex: number, array: IPendingRequest[]) => IPendingRequest): IPendingRequest {
        return this.requestArray.reduce(callbackfn);

    }

    reduceRight(callbackfn: (previousValue: IPendingRequest, currentValue: IPendingRequest, currentIndex: number, array: IPendingRequest[]) => IPendingRequest): IPendingRequest {
        return this.requestArray.reduceRight(callbackfn);
    }

    find<S extends IPendingRequest>(predicate: (this: void, value: IPendingRequest, index: number, obj: IPendingRequest[]) => value is S, thisArg?: any): S {
        return this.requestArray.find(predicate);
    }

    findIndex(predicate: (value: IPendingRequest, index: number, obj: IPendingRequest[]) => unknown, thisArg?: any): number {
        return this.requestArray.findIndex(predicate);
    }
    fill(value: IPendingRequest, start?: number, end?: number): this {
        this.requestArray.fill(value, start, end);
        return this;
    }

    entries(): IterableIterator<[number, IPendingRequest]> {
        return this.requestArray.entries();
    }

    keys(): IterableIterator<number> {
        return this.requestArray.keys();
    }

    values(): IterableIterator<IPendingRequest> {
        return this.requestArray.values();
    }

    includes(searchElement: IPendingRequest, fromIndex?: number): boolean {
        return this.requestArray.includes(searchElement, fromIndex);
    }
}
