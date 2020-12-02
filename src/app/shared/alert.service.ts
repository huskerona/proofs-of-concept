import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertMessage, AlertType } from './models/alert-message';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSubject: Subject<AlertMessage>;
  public message$: Observable<AlertMessage>;

  constructor() {
    this.messageSubject = new Subject<AlertMessage>();
    this.message$ = this.messageSubject.asObservable();
  }

  public info(msg: string): void {
    const alertMessage = this.createMessage(AlertType.Info, msg);

    this.messageSubject.next(alertMessage);
  }

  public error(msg: string): void {
    const alertMessage = this.createMessage(AlertType.Error, msg);

    this.messageSubject.next(alertMessage);
  }

  public warn(msg: string): void {
    const alertMessage = this.createMessage(AlertType.Warning, msg);

    this.messageSubject.next(alertMessage);
  }

  private createMessage(type: AlertType, msg: string): AlertMessage {
    return new AlertMessage(type, msg);
  }
}
