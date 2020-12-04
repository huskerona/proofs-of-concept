import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GatekeeperService } from '../gatekeeper.service';
import { AlertService } from '../../shared/alert.service';
import { GatekeeperConfig, HTTPDirection, HTTPMethod } from '../models/gatekeeper-config';


type KeyValuePair = {id: number, name: string};

@Component({
  selector: 'app-gatekeeper-management',
  templateUrl: './gatekeeper-management.component.html',
  styleUrls: ['./gatekeeper-management.component.scss']
})
export class GatekeeperManagementComponent implements OnInit {

  form: FormGroup;
  loading = true;
  isNew = false;

  methods: KeyValuePair[];
  directions: KeyValuePair[];

  constructor(private gatekeeperSvc: GatekeeperService,
              private alertSvc: AlertService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.methods = this.dropDownList(HTTPMethod);
    this.directions = this.dropDownList(HTTPDirection);
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isNew = true;
      this.form = this.createForm(null);
      this.loading = false;
    } else {
      this.gatekeeperSvc.getConfiguration(id).subscribe((result: GatekeeperConfig) => {
        this.form = this.createForm(result);
        this.loading = false;
      }, error => {
        this.alertSvc.error(`Cannot load configuration: ${error}`);
      });
    }
  }

  public submit(config: GatekeeperConfig): void {
    if (this.isNew) {
      this.gatekeeperSvc.registerConfiguration(config).subscribe((result: GatekeeperConfig) => {
        this.alertSvc.info('Configuration created successfully.');
        this.router.navigate(['..'], { relativeTo: this.route });
      }, error => {
        this.alertSvc.error(`Error while creating configuration. Error: ${error}`);
      });
    } else {
      this.gatekeeperSvc.updateConfiguration(config).subscribe((result: GatekeeperConfig) => {
        this.alertSvc.info('Configuration updated successfully.');
        this.router.navigate(['..'], { relativeTo: this.route });
      }, error => {
        this.alertSvc.error(`Error while updating configuration. Error: ${error}`);
      });
    }
  }

  private createForm(config: GatekeeperConfig): FormGroup {
    return this.formBuilder.group({
      id: config?.id,
      name: [config?.name, Validators.required],
      method: [config?.method ?? 0, [Validators.required, Validators.min(1)]],
      endpoint: [config?.endpoint, Validators.required],
      direction: [config?.direction ?? 0, [Validators.required, Validators.min(1)]],
      active: config?.active ?? true
    });
  }

  private dropDownList(enums: any): KeyValuePair[] {
    const result: KeyValuePair[] = [];

    for (const key in enums) {
      if (!isNaN(Number(key))) {
        continue;
      }

      result.push({id: +enums[key], name: key});
    }

    return result;
  }
}
