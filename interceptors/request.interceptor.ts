import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {
  JwtHelperService,
  GenericSubjects,
  PendingRequestService
} from '@root/services';
import { APP_CONFIG, IAppConfig } from '@root/config/app.config';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { parse } from 'url';
import { AuthService } from '@root/services';
import { CacheStorageService } from '@root/services/storage';
import { stringWithVersion, isOnline } from '@root/utils';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  unCachableRoutes: Array<string | RegExp>;
  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private cacheStorage: CacheStorageService,
    private pendingRequestService: PendingRequestService,
    private authService: AuthService,
    protected genericSubjects: GenericSubjects,
    private location: Location
  ) {
    this.unCachableRoutes = config.cacheConfig.unCachableRoutes;
  }

  isUnCachableRoutes(request: HttpRequest<any>): boolean {
    const url = request.url;

    return (
      this.unCachableRoutes.findIndex(route =>
        typeof route === 'string'
          ? route === url
          : route instanceof RegExp
          ? route.test(url)
          : false
      ) > -1
    );
  }

  async handleInterception(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    // Handle sync for post request
    const requestUrl = parse(request.url, false, true);

    const value = await isOnline(requestUrl.host);
    if (value) {
      return next
        .handle(request)
        .pipe(
          tap(
            event => this.handleResponse(request, event),
            error => this.handleResponse(request, error)
          )
        )
        .toPromise();
    } else {
      if (request.method.toLowerCase() === 'get') {
        return this.handleGetRequest(request);
      } else {
        // TODO
        return this.handleGetRequest(request);
        // return this.handleOtherRequest(request);
      }
    }
  }
  async handleOtherRequest(request: HttpRequest<any>) {
    const requestUrl = parse(request.url, false, true);
  }
  async handleGetRequest(request: HttpRequest<any>) {
    const requestUrl = parse(request.url, false, true);
    const cache = await this.cacheStorage.open(
      stringWithVersion(this.config.version, this.location.path(true))
    );
    const response = await cache.match(request);
    if (response) {
      return response;
    } else {
      const resp = new HttpResponse({
        status: 404,
        statusText: 'Aucune sauvegarde local trouvée',
        url: 'local-cache://' + requestUrl.path
      });
      this.genericSubjects
        .get<HttpResponse<any>>('noDataFoundStatus$')
        .next(resp);
      return resp;
    }
  }

  async handleResponse(request: HttpRequest<any>, httpEvent: HttpEvent<any>) {
    const cacheName = stringWithVersion(
      this.config.version,
      this.location.path(true)
    );
    if (httpEvent instanceof HttpResponse) {
      if (request.method.toLowerCase() === 'get') {
        const cache = await this.cacheStorage.open(cacheName);
        return cache.put(request, httpEvent);
      }
      if (httpEvent instanceof HttpErrorResponse) {
        if (httpEvent.status === 401) {
          this.genericSubjects
            .get<boolean>('authenticationStatus$')
            .next(false);
        }
      }
    }
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isUnCachableRoutes(request)) {
      return next.handle(request);
    }

    return from(this.handleInterception(request, next));
  }
}
