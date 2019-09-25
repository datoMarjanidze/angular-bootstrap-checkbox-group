import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularBootstrapCheckboxGroupComponent } from './angular-bootstrap-checkbox-group.component';

@NgModule({
  declarations: [AngularBootstrapCheckboxGroupComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AngularBootstrapCheckboxGroupComponent]
})
export class AngularBootstrapCheckboxGroupModule { }
