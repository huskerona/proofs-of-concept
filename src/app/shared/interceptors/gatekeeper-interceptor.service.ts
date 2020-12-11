import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GatekeeperService } from '../../gatekeeper/gatekeeper.service';
import { GatekeeperModel } from '../../gatekeeper/models/gatekeeper-model';

@Injectable()
export class GatekeeperInterceptor implements HttpInterceptor {
  constructor(private gatekeeperSvc: GatekeeperService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/api/gatekeeper') > -1) {
      return next.handle(req);
    }

    const index = req.url.indexOf('/api');

    if (index === -1) {
      return next.handle(req);
    }

    const data = req.body as GatekeeperModel;

    if (data?.endpoint?.length > 0) {
      // This is a GatekeeperModel so the process was already done. Let it go forward.
      const newReq = req.clone({
        method: data.method,
        url: `${environment.apiUrl}${data.endpoint}/`,
      });

      return next.handle(newReq);
    }

    // Not a GatekeeperModel object, so need to check whether validation is needed.
    const endpoint = req.url.substr(index);
    const config = this.gatekeeperSvc.requiresValidation(req.method, endpoint);

    if (config) {
      this.gatekeeperSvc.requestDetails(config, endpoint, req.body);
      return EMPTY;
    }

    return next.handle(req);
  }
}
