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
export async function isOnline(host?: string): Promise<boolean> {
  try {
    await fetch(host || 'http://www.google.com');
    return true;
  } catch (e) {
    return await new Promise((res, rej) => {
      onlineTrials++;
      const val = setTimeout(async () => {
        res(await isOnline(host));
        if (onlineTrials >= 10) {
          window.clearTimeout(val);
          rej(false);
        }
      }, 500);
    });
  }
}

export function stringWithVersion(version: string, value: string): string {
  return `${value}@${version}`;
}
