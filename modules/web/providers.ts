import { InjectionToken } from '@angular/core';
import { CacheStorageService, CacheService } from '@root/services';
import { ICacheStorageService } from '@root/services/storage/interfaces';
import { CacheStorageProvider } from '../providers.common';
export { CacheStorageProvider };
const cacheStorage = new CacheStorageService();

export const Providers = [
  { provide: CacheStorageProvider, useValue: cacheStorage },
  CacheService,
];
