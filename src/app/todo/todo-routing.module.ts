import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoManagementComponent } from './todo-management/todo-management.component';

const routes: Routes = [
  {
    path: '',
    component: TodoDashboardComponent,
    children: [
      {
        path: '',
        component: TodoListComponent
      },
      {
        path: ':id',
        component: TodoManagementComponent
      },
      {
        path: 'new',
        component: TodoManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
