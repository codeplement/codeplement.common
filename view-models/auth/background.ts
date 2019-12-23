import { LoaderRegistrationService } from '@root/services';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';

export abstract class AuthBackgroundViewModel implements AfterViewInit {
    protected loaderRegistry: LoaderRegistrationService;

    constructor(loaderRegistry: LoaderRegistrationService) {
        this.loaderRegistry = loaderRegistry;
    }
    ngAfterViewInit(): void {
        this.registerLoader();
    }
    protected abstract registerLoader(): void;
}
