import { Component } from '@angular/core';
@Component({
    selector: 'core-ui-auth',
    template: `
        <div id="auth">
            <core-ui-auth-back></core-ui-auth-back>
            <div class="main">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: [
        `#auth{
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
        }`,
        `#auth>div.main{
            width:100%;
            height:auto;
            position:relative;
            z-index:2;
        }`
    ]
})
export class AuthComponent {

}
