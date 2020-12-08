import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  ClrCheckboxModule,
  ClrInputModule,
  ClrSelectModule,
  ClrButtonGroupModule
} from '@clr/angular';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  declarations: [PromptComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrSelectModule,
    ClrButtonGroupModule
  ]
})
export class SharedModule { }
