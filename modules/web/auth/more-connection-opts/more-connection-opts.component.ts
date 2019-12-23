import { Component } from '@angular/core';
import { MoreConnectionOptsViewModel } from '@root/view-models/auth/more-connection-opts';
@Component({
    selector: 'core-ui-auth-mco',
    templateUrl: './more-connection-opts.component.html',
    styleUrls: ['./more-connection-opts.component.scss']
})
export class MoreConnectionOptsComponent extends MoreConnectionOptsViewModel {

    constructor() {
        super();
    }
}
