import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoManagementComponent } from './todo-management/todo-management.component';

@NgModule({
  declarations: [TodoDashboardComponent, TodoListComponent, TodoManagementComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }
