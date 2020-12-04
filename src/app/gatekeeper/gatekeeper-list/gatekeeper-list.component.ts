import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GatekeeperService } from '../gatekeeper.service';
import { GatekeeperConfig, HTTPDirection, HTTPMethod } from '../models/gatekeeper-config';

@Component({
  selector: 'app-gatekeeper-list',
  templateUrl: './gatekeeper-list.component.html',
  styleUrls: ['./gatekeeper-list.component.scss']
})
export class GatekeeperListComponent implements OnInit {

  configs$: Observable<GatekeeperConfig[]>;

  HTTPMethod = HTTPMethod;
  HTTPDirection = HTTPDirection;

  constructor(private gatekeeperSvc: GatekeeperService) { }

  ngOnInit(): void {
    this.configs$ = this.gatekeeperSvc.getConfigurations();
  }
}
