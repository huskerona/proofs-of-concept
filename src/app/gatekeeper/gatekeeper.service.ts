import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GatekeeperConfig, HTTPMethod } from './models/gatekeeper-config';

@Injectable({
  providedIn: 'root'
})
export class GatekeeperService {

  private url = environment.apiUrl + '/api/gatekeeper';

  constructor(private http: HttpClient) { }

  public getConfigurations(): Observable<GatekeeperConfig[]> {

    return this.http.get<GatekeeperConfig[]>(this.url);
  }

  public getConfiguration(id: number): Observable<GatekeeperConfig> {
    return this.http.get<GatekeeperConfig>(`${this.url}/${id}`);
  }

  public registerConfiguration(config: GatekeeperConfig): Observable<GatekeeperConfig> {

    return this.http.post<GatekeeperConfig>(this.url, config);
  }

  public updateConfiguration(config: GatekeeperConfig): Observable<GatekeeperConfig> {
    return this.http.put<GatekeeperConfig>(`${this.url}/${config.id}`, config);
  }

  public requiresValidation(method: string, endpoint: string): Observable<GatekeeperConfig> {
    const result = this.getConfigurations().pipe(
      map(configs => configs.find(item => HTTPMethod[item.method] === method && endpoint.indexOf(item.endpoint))),
    );

    return result;
  }
}
