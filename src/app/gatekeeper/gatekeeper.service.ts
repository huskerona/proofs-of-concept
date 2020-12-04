import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GatekeeperConfig } from './models/gatekeeper-config';

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
    // if (this.configs.length === 0) {
    //   config.id = 1;
    // } else {
    //   const lastEntry = this.configs.reduce((a: GatekeeperConfig, b: GatekeeperConfig) => a.id < b.id ? b : a);
    //   const nextId = lastEntry.id + 1;
    //
    //   config.id = nextId;
    // }

    return this.http.post<GatekeeperConfig>(this.url, config);
  }

  public updateConfiguration(config: GatekeeperConfig): Observable<GatekeeperConfig> {
    return this.http.put<GatekeeperConfig>(`${this.url}/${config.id}`, config);
  }
}
