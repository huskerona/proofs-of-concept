import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  ClrCheckboxModule,
  ClrInputModule,
  ClrSelectModule,
  ClrButtonGroupModule,
  ClrIconModule,
  ClrTextareaModule,
  ClrModalModule, ClrFormsModule
} from '@clr/angular';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  declarations: [PromptComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClrFormsModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrSelectModule,
    ClrButtonGroupModule,
    ClrIconModule,
    ClrTextareaModule,
    ClrModalModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    ClrFormsModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrSelectModule,
    ClrButtonGroupModule,
    ClrIconModule,
    ClrTextareaModule,
    ClrModalModule,
    PromptComponent
  ]
})
export class SharedModule { }
