import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AUTH_ROUTES } from '@root/models';
import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from '@root/services/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthService, private router: RouterExtensions) {
        console.log('auth guard');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.connectedUser;
        if (currentUser) {
            return true;
        }
        console.log('navigating to auth');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/' + AUTH_ROUTES.AUTH]);
        return false;
    }
}
