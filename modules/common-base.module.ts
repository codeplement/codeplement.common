
import { CacheStorageService, GenericSubjects } from '@root/services';
import { APP_CONFIG, IAppConfig } from '@root/config/app.config';

import { NgModule, NO_ERRORS_SCHEMA, Inject, NgZone, Optional, SkipSelf } from '@angular/core';

export class BaseCommonModule {
    constructor(
        @Optional() @SkipSelf() parentModule: BaseCommonModule,
        @Inject(APP_CONFIG) private config: IAppConfig,
        private cacheService: CacheStorageService,
        genericSubjects: GenericSubjects) {
        if (parentModule) {
            return;
        }
        genericSubjects.registerCommonSubjects();
        this.cleanCache();
    }

    async cleanCache() {
        await this.cacheService.keys().then((cacheNames) => {
            Promise.all(cacheNames.map((cacheName => {
                const cacheVersion = cacheName.split('@')[1];
                if (this.config.version > cacheVersion) {
                    return this.cacheService.delete(cacheName);
                }
            })));
        });
    }
}
