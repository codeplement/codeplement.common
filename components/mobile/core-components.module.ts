import { IconComponent } from './icon.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NgModule } from '@angular/core';
import { NativeScriptMaterialCardViewModule } from 'nativescript-material-cardview/angular';

import { registerElement } from 'nativescript-angular/element-registry';
import { Linearprogressbar } from 'nativescript-linearprogressbar';
import { TextFieldComponent } from './text-field/text-field.component';

registerElement('LinearProgressBar', () => Linearprogressbar);

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    NativeScriptMaterialCardViewModule
  ],
  declarations: [IconComponent, TextFieldComponent],
  exports: [
    IconComponent,
    TextFieldComponent,
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    NativeScriptMaterialCardViewModule
  ],
  schemas: []
})
export class CoreComponentsModule {}
