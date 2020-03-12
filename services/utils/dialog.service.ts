import { Injectable, Inject } from '@angular/core';
import { IAppTheme, APP_THEME } from '@root/config';
import { alert } from 'tns-core-modules/ui/dialogs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(@Inject(APP_THEME) private _appTheme: IAppTheme) {}

  alert(message: string, okButtonText = 'OK') {
    alert({
      message: message,
      okButtonText: okButtonText,
      title: this._appTheme.appDisplayName
    });
  }
}
