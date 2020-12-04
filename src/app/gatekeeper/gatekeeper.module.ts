import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { GatekeeperRoutingModule } from './gatekeeper-routing.module';
import { GatekeeperDashboardComponent } from './gatekeeper-dashboard/gatekeeper-dashboard.component';
import { GatekeeperListComponent } from './gatekeeper-list/gatekeeper-list.component';
import { GatekeeperManagementComponent } from './gatekeeper-management/gatekeeper-management.component';


@NgModule({
  declarations: [GatekeeperDashboardComponent, GatekeeperListComponent, GatekeeperManagementComponent],
  imports: [
    CommonModule,
    GatekeeperRoutingModule,
    SharedModule
  ]
})
export class GatekeeperModule { }
