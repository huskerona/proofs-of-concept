import { Component, OnInit } from '@angular/core';
import { AlertService } from './shared/alert.service';
import { AlertMessage, AlertType } from './shared/models/alert-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DynamicUI';
  message: AlertMessage;

  AlertType = AlertType;

  constructor(private alertSvc: AlertService) {
  }

  ngOnInit(): void {
    this.alertSvc.message$.subscribe((result: AlertMessage) => {
      this.message = result;
    });
  }
}
