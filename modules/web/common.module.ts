import 'hammerjs';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule, NO_ERRORS_SCHEMA, Inject, NgZone, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonProviders } from '../providers.common';
import { ToastService, PwaService, CacheService, CacheStorageService } from '@root/services/index.web';
import { APP_CONFIG, IAppConfig } from '@root/config/app.config';
import { BaseCommonModule } from '../common-base.module';

// import { CoreComponentsModule } from '../../components/mobile/core-components.module';

@NgModule({
    providers: [...CommonProviders, ToastService, PwaService, CacheService, CacheStorageService],
    imports: [
        AngularCommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        AngularCommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule,
        MaterialModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CommonModule extends BaseCommonModule {
}
