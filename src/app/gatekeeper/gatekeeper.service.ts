import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GatekeeperConfig, HTTPMethod } from './models/gatekeeper-config';
import { GatekeeperModel } from './models/gatekeeper-model';

type requiredModel = {
  config: GatekeeperConfig;
  originalEndpoint: string;
  model: any;
};

@Injectable({
  providedIn: 'root'
})
export class GatekeeperService {

  private url = environment.apiUrl + '/api/gatekeeper';
  private cache: GatekeeperConfig[] = [];

  private requiredEntry: Subject<requiredModel>;
  public requestUserEntry$: Observable<requiredModel>;

  constructor(private http: HttpClient) {
    this.requiredEntry = new Subject<requiredModel>();
    this.requestUserEntry$ = this.requiredEntry.asObservable();
  }

  public getConfigurations(): Observable<GatekeeperConfig[]> {

    if (this.cache.length > 0) {
      console.log('returning cached data');
      return of(this.cache);
    }

    console.log('fetching data');
    return this.http.get<GatekeeperConfig[]>(this.url).pipe(
      tap(value => this.cache.push(...value))
    );
  }

  public getConfiguration(id: number): Observable<GatekeeperConfig> {
    const index = this.cache.findIndex(p => p.id === id);

    if (index >= 0) {
      console.log('returned from cache');
      return of(this.cache[index]);
    }

    return this.http.get<GatekeeperConfig>(`${this.url}/${id}`).pipe(
      tap(item => this.cache.push(item))
    );
  }

  public registerConfiguration(config: GatekeeperConfig): Observable<GatekeeperConfig> {

    return this.http.post<GatekeeperConfig>(this.url, config).pipe(
      tap(item => this.cache.push(item))
    );
  }

  public updateConfiguration(config: GatekeeperConfig): Observable<GatekeeperConfig> {
    return this.http.put<GatekeeperConfig>(`${this.url}/${config.id}`, config).pipe(
      tap(item => {
        const index = this.cache.findIndex(p => p.id === config.id);

        if (index >= 0) {
          this.cache.splice(index, 1, item);
        }
      })
    );
  }

  public requiresValidation(method: string, endpoint: string): GatekeeperConfig {
    // Note that we are not taking into consideration whether the data was previously loaded.
    // It could happen that the cache is empty, so in this PoC I will go to the Gatekeeper route to preload.
    // This could be avoided either by using APP_INITIALIZER or some other means.
    const result = this.cache.find(p => HTTPMethod[p.method] === method && endpoint.indexOf(p.endpoint) > -1 && p.active);

    return result;
  }

  requestDetails(config: GatekeeperConfig, endpoint: string, body: any): void {
    const required: requiredModel = { config, originalEndpoint: endpoint, model: body };
    this.requiredEntry.next(required);
  }

  continueExecution(value: GatekeeperModel): Observable<any> {
    const result = this.http.request(value.method, value.endpoint, {
      body: value,
      headers: { 'Content-Type': 'application/json'}
    });

    return result;
  }
}
