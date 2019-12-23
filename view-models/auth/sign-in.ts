import { ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Validators, NgForm } from '@angular/forms';
import { IAuthService } from '@root/services/user';
import { IUser, User } from '@root/models/user';
import { throwIfNullOrUndefined, throwIfEmptyOrWhiteSpace } from '@root/utils';

export abstract class SignInViewModel implements OnInit, AfterViewInit {
    user: IUser = new User();
    username: string;
    password: string;
    viewPassword = false;
    isNextStep = false;
    formDisabled = false;
    constructor(
        protected authService: IAuthService,
        protected changeDetection: ChangeDetectorRef) {
        throwIfNullOrUndefined(authService, this.getUnDefinedErrorMsg('authService'));
    }

    private signIn(): void {
        const credentials = {
            username: this.username,
            password: this.password,
        };
        throwIfNullOrUndefined(credentials, this.getUnDefinedErrorMsg('credentials'));
        throwIfNullOrUndefined(credentials.username, this.getUnDefinedErrorMsg('credentials.username'));
        throwIfNullOrUndefined(credentials.password, this.getUnDefinedErrorMsg('credentials.password'));
        throwIfEmptyOrWhiteSpace(credentials.password, this.getEmptyErrorMsg('credentials.password'));
        throwIfEmptyOrWhiteSpace(credentials.username, this.getEmptyErrorMsg('credentials.username'));

        this.authService.signIn(credentials).subscribe(this.onLogin.bind(this));
    }

    private getUnDefinedErrorMsg(name: string) {
        return `${name} must be defined`;
    }

    private getEmptyErrorMsg(name: string) {
        return `${name} cannot not be empty`;
    }

    public nextStep(form?: NgForm): void {
        if (form && form.invalid) {
            return;
        }
        this.formDisabled = true;
        if (!this.isNextStep) {
            if (form) {
                form.form.controls.username.disable();
            }
            this.authService
                .checkUsername(this.username)
                .subscribe({
                    next: (user: IUser) => {
                        this.user = user;
                        this.formDisabled = false;
                        this.isNextStep = true;
                        this.changeDetection.detectChanges();
                    }
                });

        } else {
            if (form) {
                form.form.controls.password.disable();
            }
            this.signIn();
        }
    }
    public previousStep(): void {
        this.isNextStep = false;
        this.changeDetection.detectChanges();
    }

    public onReturnPress($ev: Event, form?: NgForm): void {
        this.nextStep(form);
    }

    //#region Abstracts
    protected abstract registerLoader(): void;
    protected abstract onLogin(user: IUser): void;
    protected abstract onInit(): void;
    //#endregion

    ngOnInit(): void {
        this.onInit();
    }

    ngAfterViewInit(): void {
        this.registerLoader();
    }
}
