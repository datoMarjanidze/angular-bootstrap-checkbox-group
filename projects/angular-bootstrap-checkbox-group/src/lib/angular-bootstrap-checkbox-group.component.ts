import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { AttributeTypeError } from './errors';

@Component({
  selector: 'checkbox-group',
  templateUrl: './angular-bootstrap-checkbox-group.component.html'
})
export class AngularBootstrapCheckboxGroupComponent implements OnInit, OnChanges {
  @Input() public readonly disabled = false;

  @Input() public values: Array<string | number>;
  @Output() private readonly valuesChange: EventEmitter<Array<string | number>> = new EventEmitter();

  public readonly optionAllUuid: string = this.generateUuid();
  public allOptionChecked = false;
  @Output() private allState: EventEmitter<boolean> = new EventEmitter();

  @Input() public readonly options: Array<string | number> | Array<[string | number, string | number]> | { [key: string]: string | number };
  private optionsAttributeTypeErrorMsg =
    `Attribute \`options\` must be one of these types: Array<string | number>, Array<[string | number, string | number]> or { [key: string]: string | number }, got ${typeof this.options}.`;
  @Input() public readonly titleCaseOptions = false;
  @Output() private getClickedOptionKeyState: EventEmitter<{ key: string | number, state: boolean }> = new EventEmitter();
  public processedOptions: Array<[string | number, string | number]> = [];
  public processOptionsUuids: Array<string> = [];

  public ngOnInit() {
    this.validateValues();
    this.validateAndProcessOptions();
  }

  public ngOnChanges(simpleChanges: SimpleChanges) {
    this.validateValues();
    if (simpleChanges.options)
      this.validateAndProcessOptions();
    if (simpleChanges.values) {
      if (
        this.processedOptions.length &&
        this.values.length === this.processedOptions.length
      ) this.allOptionChecked = true;
    }
  }

  private validateValues(): void {
    if (!this.values || this.values && !Array.isArray(this.values))
      throw new AttributeTypeError(
        `Attribute \`values\` must be an Array<string | number>, got ${typeof this.values}.`
      );
  }

  private validateAndProcessOptions(): void {
    if (this.options && typeof this.options === 'object') {
      this.processedOptions.length = 0;
      if (Array.isArray(this.options) && typeof this.options[0] === 'string')
        this.options.forEach(
          option => this.processedOptions.push([option, option])
        );
      else if (
        Array.isArray(this.options) &&
        Array.isArray(this.options[0]) &&
        (this.options[0] as [string, string]).length === 2
      ) this.processedOptions = <Array<[string, string]>>JSON.parse(JSON.stringify(this.options));
      else if (typeof this.options === 'object' && !Array.isArray(this.options))
        Object.entries(this.options).forEach(entry =>
          this.processedOptions.push([entry[0], entry[1]])
        );
      else throw new AttributeTypeError(this.optionsAttributeTypeErrorMsg);
      if (!this.processedOptions.length)
        this.values.length = 0;
      this.valuesChange.emit(this.values);
      // for (let i = 0; i < this.processedOptions.length; i++)
      this.processedOptions.forEach(
        processedOption => this.processOptionsUuids.push(this.generateUuid())
      );
    } else throw new AttributeTypeError(this.optionsAttributeTypeErrorMsg);
  }

  public generateUuid(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  public handleOptionAll(): void {
    if (this.allOptionChecked)
      this.values.push(
        ...this.processedOptions.map(processedOption => processedOption[0])
      );
    else this.values.length = 0;
    this.valuesChange.emit([...new Set(this.values)]);
    this.allState.emit(this.allOptionChecked);
  }

  public handleSelection(key: string | number): void {
    let state = false;
    if (this.values.includes(key))
      this.values.splice(this.values.indexOf(key), 1);
    else {
      this.values.push(key);
      state = true;
    }
    this.valuesChange.emit(this.values);
    this.getClickedOptionKeyState.emit({ key, state });
  }
}
