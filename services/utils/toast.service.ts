import { Injectable, Inject } from '@angular/core';
import { MessageService } from './message.service';
import {
  ToastDuration,
  ToastPosition,
  ToastyOptions
} from 'nativescript-toasty';

import { createToast } from './toast';
import { APP_THEME, IAppTheme } from '@root/config/app.theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService extends MessageService {
  /**
   *
   */
  constructor(@Inject(APP_THEME) private _theme: IAppTheme) {
    super();
  }

  protected show(param: {
    text: string;
    timeout?: number;
    persist?: boolean;
    data?: any;
  }): void {
    const options = (param.data || {
      backgroundColor: this._theme.dangerColor,
      position: ToastPosition.BOTTOM,
      tapToDismiss: true,
      textColor: this._theme.dangerForeColor,
      yAxisOffset: 20
    }) as ToastyOptions;
    options.text = param.text;
    options.duration =
      param.persist || param.timeout > 1000
        ? ToastDuration.LONG
        : ToastDuration.SHORT;

    createToast(options).show();
  }
}
