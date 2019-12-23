import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { APP_CONFIG, AppConfig } from '@root/config/app.config';
import { MoreConnectionOptsComponent } from './more-connection-opts/more-connection-opts.component';
import { CommonModule } from '../common.module';
import { BackgroundComponent } from './background/background.component';

@NgModule({
    imports: [CommonModule, AuthRoutingModule],
    declarations: [SignUpComponent, SignInComponent, MoreConnectionOptsComponent, AuthComponent, BackgroundComponent],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
