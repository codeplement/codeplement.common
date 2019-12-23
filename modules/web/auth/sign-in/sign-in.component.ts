import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInViewModel } from '@root/view-models/auth/sign-in';
import { AuthService } from '@root/services/user';
import { IUser } from '@root/models';
import { Router } from '@angular/router';
import { LoaderRegistrationService } from '@root/services';
import { MatProgressBar } from '@angular/material';
@Component({
    selector: 'core-ui-auth-si',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends SignInViewModel {
    @ViewChild('loader', { static: true }) loader: MatProgressBar;

    constructor(
        protected authService: AuthService,
        protected formBuilder: FormBuilder,
        private router: Router,
        protected changeDetection: ChangeDetectorRef,
        private loaderRegistry: LoaderRegistrationService) {
        super(authService, changeDetection);
    }

    protected onInit(): void {

    }

    protected registerLoader(): void {
        this.loaderRegistry.register('auth-loader', {
            next: (val) => {
                this.loader.value = val ? 0 : 100;
                this.loader.mode = val ? 'indeterminate' : 'determinate';
            }
        });
    }

    protected onLogin(user: IUser): void {
        console.log(user);
        this.router.navigate(['/']);
    }
}
