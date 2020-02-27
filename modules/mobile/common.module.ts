import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { CoreComponentsModule } from '@root/components/mobile/core-components.module';
import { CommonProviders } from '../providers.common';
// import { BaseCommonModule } from '../common-base.module';
import { CoreDirectivesModule } from '@root/directives/mobile/core-directives.module';

@NgModule({
  providers: [...CommonProviders],
  imports: [
    NativeScriptCommonModule,
    // NativeScriptModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    NativeScriptHttpClientModule,
    CoreComponentsModule,
    CoreDirectivesModule
  ],
  exports: [
    NativeScriptCommonModule,
    // NativeScriptModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    NativeScriptHttpClientModule,
    CoreComponentsModule,
    CoreDirectivesModule
  ],
  schemas: []
})
export class CommonModule {}
