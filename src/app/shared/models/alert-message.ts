export class AlertMessage {
  constructor(public type: AlertType, public message: string) { }
}

export enum AlertType {
  Info,
  Warning,
  Error
}
