export class ObservableArray<T>{
    [n: number]: T;
    [x: string]: any;
    private array: T[] = [];
    private handlers: any = {
        itemadded: [],
        itemremoved: [],
        itemset: []
    };
    constructor() {
        Object.getOwnPropertyNames(Array.prototype).forEach((name) => {
            if (!(name in this)) {
                Object.defineProperty(this, name, {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: Array.prototype[name]
                });
            }
        });

    }
    addEventListener(eventName: string,
        handler: (event: {
            type: 'itemset' | 'itemremoved' | 'itemremoved',
            index: number,
            item: T
        }) => {}) {
        eventName = ('' + eventName).toLowerCase();
        this.handlers[eventName].push(handler);
    }
    removeEventListner(eventName: string,
        handler: (event: {
            type: 'itemset' | 'itemremoved' | 'itemremoved',
            index: number,
            item: T
        }) => {}) {
        eventName = ('' + eventName).toLowerCase();

        let h = this.handlers[eventName];
        let ln = h.length;
        while (--ln >= 0) {
            if (h[ln] === handler) {
                h.splice(ln, 1);
            }
        }
    }
    push(...items: T[]) {
        items = items || [];
        let index: number;
        for (let i = 0, ln = items.length; i < ln; i++) {
            index = this.array.length;
            this.array.push(items[i]);
            this.defineIndexProperty(index);
            this.raiseEvent({
                type: 'itemadded',
                index: index,
                item: items[i]
            });
        }
        return this.array.length;
    }
    pop(): T | undefined {
        if (this.array.length > -1) {
            let index = this.array.length - 1,
                item = this.array.pop();
            delete this[index];
            this.raiseEvent({
                type: 'itemremoved',
                index: index,
                item: item
            });
            return item;
        }
    }
    unshift(...items: T[]): number {
        for (let i = 0, ln = items.length; i < ln; i++) {
            this.array.splice(i, 0, items[i]);
            this.defineIndexProperty(this.array.length - 1);
            this.raiseEvent({
                type: 'itemadded',
                index: i,
                item: items[i]
            });
        }
        for (let i = 0; i < this.array.length; i++) {
            this.raiseEvent({
                type: 'itemset',
                index: i,
                item: this.array[i]
            });
        }
        return this.array.length;
    }

    shift(): T | undefined {
        if (this.array.length > -1) {
            let item = this.array.shift();
            delete this[this.array.length];
            this.raiseEvent({
                type: 'itemremoved',
                index: 0,
                item: item
            });
            return item;
        }
    }

    splice(index?: number, deleteCount?: number, ...items: T[]): T[] {
        let removed = [],
            item: any,
            pos: any;
        items = items || [];
        index = index == null ? 0 : index < 0 ? this.array.length + index : index;

        deleteCount = deleteCount == null ? this.array.length - index : deleteCount > 0 ? deleteCount : 0;

        while (deleteCount--) {
            item = this.array.splice(index, 1)[0];
            removed.push(item);
            delete this[this.array.length];
            this.raiseEvent({
                type: 'itemremoved',
                index: index + removed.length - 1,
                item: item
            });
        }

        for (let i = 0, ln = items.length; i < ln; i++) {
            this.array.splice(index, 0, items[i]);
            this.defineIndexProperty(this.array.length - 1);
            this.raiseEvent({
                type: 'itemadded',
                index: index,
                item: items[i]
            });
            index++;
        }

        return removed;
    }
    get length() {
        return this.array.length;
    }
    set length(value: number) {
        let n = (value);
        let length = this.array.length;
        if (n % 1 === 0 && n >= 0) {
            if (n < length) {
                this.splice(n);
            } else if (n > length) {
                [].push.apply(this, new Array(n - length));
            }
        } else {
            throw new RangeError('Invalid array length');
        }
        this.array.length = n;
    }
    private defineIndexProperty(index: string | number | symbol) {
        const _self = this;
        if (!(index in _self)) {
            Object.defineProperty(_self, index, {
                configurable: true,
                enumerable: true,
                get: function () {
                    return _self.array[index];
                },
                set: function (v) {
                    _self.array[index] = v;
                    this.raiseEvent({
                        type: 'itemset',
                        index: index,
                        item: v
                    });
                }
            });
        }
    }
    private raiseEvent(event: { type: string | number | symbol; index?: string | number | symbol; item?: T; }) {
        const _self = this;
        this.handlers[event.type].forEach(function (h: { call: (arg0: any, arg1: any) => void; }) {
            h.call(_self, event);
        });
    }

}
