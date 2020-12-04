export class GatekeeperConfig {
  id!: number;
  name!: string;
  method!: HTTPMethod;
  endpoint!: string;
  direction!: HTTPDirection;
  active!: boolean;
}

export enum HTTPMethod {
  GET = 1,
  POST,
  PUT,
  DELETE
}

export enum HTTPDirection {
  Request = 1,
  Response
}
