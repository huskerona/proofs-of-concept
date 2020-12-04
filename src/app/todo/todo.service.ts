import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { errorObject } from 'rxjs/internal-compatibility';
import { environment } from '../../environments/environment';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = environment.apiUrl + '/todo';

  constructor(private http: HttpClient) { }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url);
  }

  public getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.url}/${id}`);
  }

  public register(item: Item): Observable<Item> {
    return this.http.post<Item>(this.url, item);
  }

  public update(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.url}/${item.id}`, item);
  }
}
