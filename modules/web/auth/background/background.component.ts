import { Component } from '@angular/core';
import { LoaderRegistrationService } from '@root/services';
import { AuthBackgroundViewModel } from '@root/view-models/auth/background';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar } from '@angular/material';
@Component({
    selector: 'core-ui-auth-back',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss']
})
export class BackgroundComponent extends AuthBackgroundViewModel {
    @ViewChild('loader', { static: true }) loader: MatProgressBar;

    constructor(loaderRegistry: LoaderRegistrationService) {
        super(loaderRegistry);
    }
    registerLoader(): void {
        this.loaderRegistry.register('auth-loader', {
            next: (val) => {
                this.loader.value = val ? 0 : 100;
                this.loader.mode = val ? 'indeterminate' : 'determinate';
            }
        });
    }
}
