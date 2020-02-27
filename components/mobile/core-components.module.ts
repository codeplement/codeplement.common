import { IconComponent } from './icon.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import { Linearprogressbar } from 'nativescript-linearprogressbar';
import { TextFieldComponent } from './text-field/text-field.component';
registerElement('CardView', () => CardView);

registerElement('LinearProgressBar', () => Linearprogressbar);

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptUISideDrawerModule],
  declarations: [IconComponent, TextFieldComponent],
  exports: [
    IconComponent,
    TextFieldComponent,
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreComponentsModule {}
