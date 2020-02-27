import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'core-ui-icon',
  styles: [
    `
      .mdi {
        font-family: 'Material Icons', 'MaterialIcons-Regular';
      }
    `
  ],
  template: `
    <Label
      verticalAlignment="center"
      horizontalAlignment="center"
      (tap)="launchEvent($event)"
      [class]="customStyle + ' mdi m-l-2 m-r-2'"
      style="font-color:{{ color }};font-size:{{ size }}px;"
      [text]="name"
    >
    </Label>
  `
})
export class IconComponent {
  public customStyle: string;
  public color: string;
  @Input() name: string;
  @Input() size = 24;
  @Input()
  set backColor(val: string) {
    if (['primary', 'accent', 'warn'].indexOf(val) > -1) {
      console.log('in here');
      this.customStyle = 'icon-' + val;
      this.color = 'inherit';
    } else {
      this.color = val;
    }
  }
  @Output() tapAction = new EventEmitter<any>();

  constructor() {}
  launchEvent($event) {
    this.tapAction.emit($event);
  }
}
