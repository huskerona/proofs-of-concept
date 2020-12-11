import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GatekeeperService } from '../../gatekeeper/gatekeeper.service';
import { GatekeeperConfig, HTTPMethod } from '../../gatekeeper/models/gatekeeper-config';
import { GatekeeperModel } from '../../gatekeeper/models/gatekeeper-model';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  showPopup = false;
  data: any;
  form: FormGroup;

  constructor(private gatekeeperSvc: GatekeeperService,
              private alertSvc: AlertService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm();

    this.gatekeeperSvc.requestUserEntry$.subscribe((data: {
      config: GatekeeperConfig,
      originalEndpoint: string,
      model: any }) => {
        this.data = data;
        this.showPopup = true;
    });
  }

  public submit(value: any): void {
    const result = new GatekeeperModel();
    result.endpoint = this.data.originalEndpoint;
    result.method = HTTPMethod[this.data.config.method];
    result.accepted = value.accepted;
    result.reasonText = value.reason;
    result.data = this.data.model;

    this.gatekeeperSvc.continueExecution(result).subscribe((response: any) => {
      this.showPopup = false;
      console.log(this.showPopup);
    }, error => this.alertSvc.error(`Error while continuing execution. Error: ${error}`));

    console.log(this.showPopup);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      reason: ['', [Validators.required]],
      accepted: [false]
    });
  }
}
