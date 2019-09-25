Angular library for the simple checkbox group element(s).

[![NPM](https://nodei.co/npm/angular-bootstrap-checkbox-group.png?compact=true)](https://nodei.co/npm/angular-bootstrap-checkbox-group/)

## Table Of Contents
* [Installation](#installation)
* [Example](#example)
* [Versions](#versions)
* [Attribute Definition Table](#attribute-definition-table)

## Installation
```
npm i angular-bootstrap-checkbox-group
```

## Example
![](https://raw.githubusercontent.com/datoMarjanidze/angular-bootstrap-checkbox-group/master/images/demo.gif)
```HTML
<!-- some.component.html -->

<checkbox-group
  [(values)]="values"
  [options]="optionsArrayOfString"
  [disabled]="disabled"
  [titleCaseOptions]="true"
  (allState)="handleAllClick($event);"
  (getClickedOptionKeyState)="handleOptionStateChange($event.key, $event.state);"
></checkbox-group>
<h5>Pizza for delivery:</h5>
[<span *ngFor="let value of values; index as i">'{{ value }}'{{ i !== values.length - 1 ? ", " : "" }}</span>]
<button *ngIf="!disabled" (click)="disabled = !disabled" class="btn btn-secondary">Disable</button>
<button *ngIf="disabled" (click)="disabled = !disabled" class="btn btn-primary">Enable</button>
```
```javascript
// some.component.ts

export class MyComponent {
  public disabled: boolean = false;
  public readonly values: Array<string> = [];
  public optionsArrayOfString: Array<string> = [
    "neapolitan",
    "california style",
    "chicago deep dish",
    "new york thin crust"
  ];
  public optionsTupples: Array<[string, string]> = [
    ['neapolitan', 'Neapolitan'],
    ['california style', 'California Style'],
    ['chicago deep dish', 'Chicago Deep Dish'],
    ['new york thin crust', 'New York Thin Crust']
  ];
  public optionsObject: { [key: string]: string } = {
    'neapolitan': 'Neapolitan',
    'california style': 'California Style',
    'chicago deep dish': 'Chicago Deep Dish',
    'new york thin crust': 'New York Thin Crust'
  };

  public handleAllClick = (state: boolean): void => console.log(`state: ${state}`);

  public handleOptionStateChange(key: string, state: boolean): void {
    console.log(`key: ${key} - state: ${state}`);
  }
}
```

## Versions
This library is using Angular 8.2 and tested on the host Angular app in
which Bootstrap 4.3.1 was installed.

## Attribute Definition Table
Attributes for `<checkbox-group></checkbox-group>` element:
| Attribute                | Decorator | Type                                                    | Optional | Default Value         |
| ------------------------ | --------- | ------------------------------------------------------- | -------- | --------------------- |
| disabled                 | Input     | boolean                                                 | True     | false                 |
| values                   | Input     | Array<string \| number>                                 | False    | undefined             |
| valuesChange             | Output    | EventEmitter<Array<string \| number>>                   | True     | EventEmitter instance |
| options                  | Input     | Array<string \| number>                                 | False    | undefined             |  
| options                  | Input     | Array<[string \| number, string \| number]>             | False    | undefined             |  
| options                  | Input     | { [key: string]: string \| number }                     | False    | undefined             |  
| titleCaseOptions         | Input     | boolean                                                 | True     | false                 |
| allState                 | Output    | EventEmitter<boolean>                                   | True     | EventEmitter instance |
| getClickedOptionKeyState | Output    | EventEmitter<{ key: string \| number, state: boolean }> | True     | EventEmitter instance |