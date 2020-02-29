import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { JwtHelperService } from '@root/services';
import { APP_CONFIG, IAppConfig } from '@root/config/app.config';
import { Observable, from, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { parse } from 'url';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  getToken: () => string | null | Promise<string | null>;
  headerName: string;
  authScheme: string;
  appDomains: Array<string | RegExp>;
  anonymousRoutes: Array<string | RegExp>;
  throwNoTokenError: boolean;
  continueIfTokenExpired: boolean;

  constructor(
    @Inject(APP_CONFIG) config: IAppConfig,
    private jwtHelper: JwtHelperService
  ) {
    this.getToken = config.authorization.getToken || (() => null);
    this.headerName =
      config.authorization.authorizationHeaderName || 'Authorization';
    this.authScheme =
      config.authorization.authorizationScheme ||
      config.authorization.authorizationScheme === ''
        ? config.authorization.authorizationScheme
        : 'Bearer ';
    this.appDomains = config.authorization.appDomains || [];
    this.anonymousRoutes = config.authorization.anonymousRoutes || [];
    this.throwNoTokenError = config.authorization.throwNoTokenError || false;
    this.continueIfTokenExpired = config.authorization.continueIfTokenExpired;
  }

  isAppDomain(request: HttpRequest<any>): boolean {
    const requestUrl: any = parse(request.url, false, true);

    return (
      requestUrl.host === null ||
      this.appDomains.findIndex(domain =>
        typeof domain === 'string'
          ? domain === requestUrl.host
          : domain instanceof RegExp
          ? domain.test(requestUrl.host)
          : false
      ) > -1
    );
  }

  isAnonymousRoute(request: HttpRequest<any>): boolean {
    const url = request.url;

    return (
      this.anonymousRoutes.findIndex(route =>
        typeof route === 'string'
          ? route === url
          : route instanceof RegExp
          ? route.test(url)
          : false
      ) > -1
    );
  }

  handleInterception(
    token: string | null,
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let tokenIsExpired = false;

    if (!token && this.throwNoTokenError) {
      throw new Error('Could not get token.');
    } else if (!token) {
      return EMPTY;
    }

    tokenIsExpired = this.jwtHelper.isTokenExpired(token);

    if (tokenIsExpired && this.continueIfTokenExpired) {
      request = request.clone();
    } else if (tokenIsExpired && !this.continueIfTokenExpired) {
      return EMPTY;
    } else if (!tokenIsExpired) {
      request = request.clone({
        headers: request.headers.set(
          this.headerName,
          `${this.authScheme}${token}`
        )
      });
    }
    return next.handle(request);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isAppDomain(request) || this.isAnonymousRoute(request)) {
      return next.handle(request);
    }
    const token = this.getToken();

    if (token instanceof Promise) {
      return from(token).pipe(
        mergeMap((asyncToken: string | null) => {
          return this.handleInterception(asyncToken, request, next);
        })
      );
    } else {
      return this.handleInterception(token, request, next);
    }
  }
}
