export class GatekeeperModel {
  method!: string;
  endpoint!: string;
  data: any;

  reasonText!: string;
  accepted?: boolean;
  // any other value that would make sense
}
