import {
  LoaderRegistrationService,
  AuthService,
  LocalStorageService,
  JwtHelperService
} from '@root/services';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@root/interceptors';
import { RequestInterceptor } from '@root/interceptors/request.interceptor';
import { AppConfig, APP_CONFIG } from '@root/config/app.config';

export const CommonProviders = [
  LoaderRegistrationService,
  AuthService,
  LocalStorageService,
  JwtHelperService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
  // {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: RequestInterceptor,
  //     multi: true
  // },
  { provide: APP_CONFIG, useValue: AppConfig }
];
