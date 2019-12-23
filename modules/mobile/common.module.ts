import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { CoreComponentsModule } from '@root/components/mobile/core-components.module';
import { CommonProviders } from '../providers.common';
import { BaseCommonModule } from '../common-base.module';

@NgModule({
    providers: [...CommonProviders],
    imports: [
        NativeScriptCommonModule,
        // NativeScriptModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        CoreComponentsModule
    ],
    exports: [
        NativeScriptCommonModule,
        // NativeScriptModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        CoreComponentsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CommonModule extends BaseCommonModule { }
