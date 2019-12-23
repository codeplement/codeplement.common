import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { SignInViewModel } from '@root/view-models/auth/sign-in';
import { AuthService } from '@root/services/user';
import { IUser } from '@root/models';
import { RouterExtensions } from 'nativescript-angular/router';
import { Linearprogressbar } from 'nativescript-linearprogressbar';
import { LoaderRegistrationService } from '@root/services';
@Component({
    selector: 'core-ui-auth-si',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends SignInViewModel implements OnInit {
    @ViewChild('loader', { static: true }) loader: ElementRef<ContentView>;
    loaderActive = false;
    constructor(
        protected authService: AuthService,
        private page: Page,
        private router: RouterExtensions,
        protected changeDetection: ChangeDetectorRef,
        private loaderRegistry: LoaderRegistrationService) {
        super(authService, changeDetection);
        page.actionBarHidden = true;
        page.backgroundSpanUnderStatusBar = true;
        this.page.on('loaded', this.onLoad.bind(this));
    }

    private onLoad(): void {
        this.switchLoaderColor(false);
    }
    private switchLoaderColor(on: boolean) {
        const loader = this.loader.nativeElement.nativeView as Linearprogressbar;
        if (on) {
            console.log('active');
            // loader.setBackgroundColor('#aaaaaa');
            loader.indeterminate = true;
        } else {
            console.log('inactive');
            // loader.setBackgroundColor('#E865B5');
            loader.indeterminate = false;
        }
    }
    protected onInit(): void {

    }

    protected registerLoader(): void {
        this.loaderRegistry.register('auth-loader', {
            next: (val) => {
                this.loaderActive = val;
            }
        });
    }

    protected onLogin(user: IUser): void {
        this.router.navigate(['/']);
    }
}
