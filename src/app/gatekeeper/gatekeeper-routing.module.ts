import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GatekeeperDashboardComponent } from './gatekeeper-dashboard/gatekeeper-dashboard.component';
import { GatekeeperListComponent } from './gatekeeper-list/gatekeeper-list.component';
import { GatekeeperManagementComponent } from './gatekeeper-management/gatekeeper-management.component';

const routes: Routes = [{
  path: '',
  component: GatekeeperDashboardComponent,
  children: [{
    path: '',
    component: GatekeeperListComponent
  }, {
    path: ':id',
    component: GatekeeperManagementComponent
  }, {
    path: 'new',
    component: GatekeeperManagementComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatekeeperRoutingModule { }
