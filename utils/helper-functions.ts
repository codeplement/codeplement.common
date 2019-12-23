export function throwIfNullOrUndefined(obj: any, message: string) {
    if (obj == null) {
        throw new Error(message);
    }
}
export function throwIfEmptyOrWhiteSpace(obj: string, message: string) {
    if (obj.trim() === '') {
        throw new Error(message);
    }
}
let onlineTrials = 0;
export function isOnline(host?: string): Promise<boolean> {
    return fetch(host || 'http://www.google.com')
        .then(() => true)
        .catch(() => new Promise((res, rej) => {
            onlineTrials++;
            let val = setTimeout(() => {
                res(isOnline(host));
                if (onlineTrials >= 10) {
                    window.clearTimeout(val);
                    res(false);
                }
            }, 500);
        }));
}

export function stringWithVersion(version: string, value: string): string {
    return `${value}@${version}`;
}