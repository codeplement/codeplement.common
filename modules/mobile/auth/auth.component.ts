import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    selector: 'core-ui-auth',
    template: '<page-router-outlet></page-router-outlet>'
})
export class AuthComponent implements OnInit {
    constructor(page: Page) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void { }
}
