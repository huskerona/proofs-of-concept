import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GatekeeperService } from '../../gatekeeper/gatekeeper.service';

@Injectable()
export class GatekeeperInterceptor implements HttpInterceptor {
  constructor(private gatekeeperSvc: GatekeeperService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`method: ${req.method}`);
    console.log(`url: ${req.url}`); // represents the API Endpoint route, not the Angular route

    const index = req.url.indexOf('/api');

    if (index === -1) {
      return next.handle(req);
    }

    const endpoint = req.url.substr(index);
    const result = this.gatekeeperSvc.requiresValidation(req.method, endpoint).pipe(

    );

    if (!result) {
      console.log('No result');
      return next.handle(req);
    }

    console.log(result);

    return next.handle(req);
  }
}
