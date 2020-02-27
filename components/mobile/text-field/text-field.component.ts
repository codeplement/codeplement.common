import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  KeyboardType,
  ReturnKeyType
} from 'tns-core-modules/ui/editable-text-base';
import { TextField } from 'tns-core-modules/ui/text-field';
import { ContentView } from 'tns-core-modules/ui/content-view';
@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ],
  selector: 'core-ui-tf',
  styleUrls: ['./text-field.component.scss'],
  templateUrl: './text-field.component.html'
})
export class TextFieldComponent implements ControlValueAccessor {
  private text = '';
  @ViewChild('textField', { static: true }) textField: ElementRef<ContentView>;

  @Input() iconSuffix: string;
  @Input() iconPrefix: string;
  @Input() iconColor: string;
  @Output() iconSuffixTapAction = new EventEmitter<any>();
  @Output() iconPrefixTapAction = new EventEmitter<any>();

  @Input() hint: string;

  @Input()
  get textValue() {
    return this.text;
  }

  set textValue(val) {
    this.text = val;
    this.propagateChange(this.text);
  }
  @Input() secure: boolean;
  @Input() required: boolean;
  @Input() editable = true;
  @Input() autocorrect: boolean;
  @Input() maxLength: number;
  @Input() keyboardType: KeyboardType;
  @Input() returnKeyType: ReturnKeyType;
  @Input() customTextFieldClass = '';
  @Input() customClass = '';
  @Output() returnPress = new EventEmitter<any>();
  @Output() textFieldFocus = new EventEmitter<any>();
  @Output() textFieldBlur = new EventEmitter<any>();
  propagateChange = (_: any) => {};
  constructor() {}

  onTextChange(args) {
    const textField = args.object as TextField;
    console.log(textField.text);
    this.textValue = textField.text;
  }
  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.textValue = obj as string;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.textField.nativeElement.nativeView.editable = !isDisabled;
  }
}
