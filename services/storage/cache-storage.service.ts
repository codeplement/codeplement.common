
import {
    HttpResponse,
    HttpRequest
} from '@angular/common/http';
import { ICacheStorageService, ICacheService } from './i.cache.service';

export class CacheStorageService implements ICacheStorageService {
    delete(cacheName: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    has(cacheName: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    keys(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    match(request: HttpRequest<any>): Promise<HttpResponse<any>> {
        throw new Error('Method not implemented.');
    }
    open(cacheName: string): Promise<ICacheService> {
        throw new Error('Method not implemented.');
    }

}
