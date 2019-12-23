import { AUTH_ROUTES } from '@root/models';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: AUTH_ROUTES.SIGN_IN
            },
            {
                path: AUTH_ROUTES.SIGN_UP,
                component: SignUpComponent
            },
            {
                path: AUTH_ROUTES.SIGN_IN,
                component: SignInComponent
            }

        ]
    },
];
