import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../../models/utils';
import { KeyValue } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Loader } from './loader.service';
import { ILocalStorageService } from '@root/services';

export abstract class HttpService {
  private _httpOptions: HttpOptions;
  protected abstract get loader(): Loader;

  constructor(
    protected http: HttpClient,
    protected storage: ILocalStorageService,
    protected localStorageKey: string | null,
    protected messager: MessageService | null,
    protected baseUrl: string
  ) {
    this.httpOptions = HttpService.defaultHttpOptions();
  }

  public static defaultHttpOptions(): HttpOptions {
    return new HttpOptions().setHeader({
      key: 'Content-Type',
      value: 'application/json'
    });
  }

  protected set httpOptions(value: HttpOptions) {
    this._httpOptions = value;
  }

  protected get httpOptions() {
    return this._httpOptions;
  }

  protected get<T>(
    path: string,
    ...params: KeyValue<string, string>[]
  ): Observable<T> {
    this.loader.show();

    return this.http
      .get<T>(
        this.baseUrl + path,
        this.httpOptions.addParams(...params).getOptions()
      )
      .pipe(
        map(res => {
          this.loader.hide();
          return res;
        }),
        catchError(this.errorHandler<T>())
      );
  }

  protected put<T>(
    path: string,
    body: any = null,
    ...params: KeyValue<string, string>[]
  ): Observable<T> {
    this.loader.show();

    return this.http
      .put<T>(
        this.baseUrl + path,
        body,
        this.httpOptions.addParams(...params).getOptions()
      )
      .pipe(
        map(res => {
          this.loader.hide();
          return res;
        }),
        catchError(this.errorHandler<T>())
      );
  }

  protected post<T>(
    path: string,
    body: any = null,
    ...params: KeyValue<string, string>[]
  ): Observable<T> {
    this.loader.show();

    return this.http
      .post<T>(
        this.baseUrl + path,
        body,
        this.httpOptions.addParams(...params).getOptions()
      )
      .pipe(
        map(res => {
          this.loader.hide();
          return res;
        }),
        catchError(this.errorHandler<T>())
      );
  }

  protected patch<T>(
    path: string,
    body: any = null,
    ...params: KeyValue<string, string>[]
  ): Observable<T> {
    this.loader.show();

    return this.http
      .patch<T>(
        this.baseUrl + path,
        body,
        this.httpOptions.addParams(...params).getOptions()
      )
      .pipe(
        map(res => {
          this.loader.hide();
          return res;
        }),
        catchError(this.errorHandler<T>())
      );
  }

  protected head<T>(
    path: string,
    ...params: KeyValue<string, string>[]
  ): Observable<T> {
    this.loader.show();

    return this.http
      .head<T>(
        this.baseUrl + path,
        this.httpOptions.addParams(...params).getOptions()
      )
      .pipe(
        map(res => {
          this.loader.hide();
          return res;
        }),
        catchError(this.errorHandler<T>())
      );
  }

  protected options<T>(
    path: string,
    ...params: KeyValue<string, string>[]
  ): Observable<T> {
    this.loader.show();

    return this.http
      .options<T>(
        this.baseUrl + path,
        this.httpOptions.addParams(...params).getOptions()
      )
      .pipe(
        map(res => {
          this.loader.hide();
          return res;
        }),
        catchError(this.errorHandler<T>())
      );
  }

  protected jsonp(path: string, callBackParam: string): Observable<Object> {
    return this.http.jsonp(this.baseUrl + path, callBackParam);
  }

  protected delete<T>(
    path: string,
    ...params: KeyValue<string, string>[]
  ): Observable<T> {
    this.loader.show();

    return this.http
      .delete<T>(
        this.baseUrl + path,
        this.httpOptions.addParams(...params).getOptions()
      )
      .pipe(
        map(res => {
          this.loader.hide();
          return res;
        }),
        catchError(this.errorHandler<T>())
      );
  }

  private errorHandler<T>(): (
    err: any,
    caught: Observable<T>
  ) => Observable<T> {
    return (err: Error): Observable<T> => {
      this.loader.hide();
      // TODO: send the error to remote logging infrastructure
      console.error(err); // log to console instead
      if (this.messager) {
        this.messager.push({
          text: err.message,
          timeout: 5000,
          persit: false
        });
      }

      // TODO: better job of transforming error for user consumption
      // this.log(`${op} failed: ${err.message}`);

      // Let the app keep running by returning an empty result.
      return of({} as T);
    };
  }
}
