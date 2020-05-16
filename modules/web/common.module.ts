import { CommonModule as AngularCommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  NgModule,
  NO_ERRORS_SCHEMA,
  Inject,
  NgZone,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonProviders } from '../providers.common';
import { cleanCache } from '../common-base.module';
import { Providers } from '../mobile/providers';
import { APP_CONFIG, IAppConfig } from '@root/config';
import { CacheStorageProvider } from './providers';
import { GenericSubjects } from '@root/services';
import { ICacheStorageService } from '@root/services/storage/interfaces';

// import { CoreComponentsModule } from '../../components/mobile/core-components.module';

@NgModule({
  providers: [...CommonProviders, ...Providers],
  imports: [
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CommonModule {
  constructor(genericSubjects: GenericSubjects) {
    console.log('done');
    genericSubjects.registerCommonSubjects();
  }
}
