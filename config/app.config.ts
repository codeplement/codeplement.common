import {
    InjectionToken
} from '@angular/core';
import { IEndPoint } from './endpoint';
import appConfig from '@root/../../app.config.json';

export interface IAuthorization {
    authorisedDomains: (RegExp | string)[];
    blackListedRoutes: (RegExp | string)[];
    authorizationHeaderName: string;
    authorizationScheme: string;
    throwNoTokenError: boolean,
    skipWhenExpired: boolean
}
export interface IAppConfig {
    license: string;
    version: string;
    authorization: IAuthorization;
    apiEndpoints: {
        [x: string]: IEndPoint;
    };
    cacheConfig: {
        unCachableRoutes: (RegExp | string)[];
    }
}

export const AppConfig: IAppConfig = appConfig;

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config', {
    providedIn: 'root',
    factory: () => AppConfig
});
