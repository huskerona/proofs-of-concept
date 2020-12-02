import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { errorObject } from 'rxjs/internal-compatibility';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly items: Item[];

  constructor() {
    this.items = [];
    this.items.push({ id: 1, name: 'Create interceptor', dueDate: new Date(), completed: false });
    this.items.push({ id: 2, name: 'Write story', dueDate: new Date(2020, 11, 5), completed: false });
    this.items.push({ id: 3, name: 'Learn Angular', dueDate: new Date(2015, 4, 4), completed: true });
  }

  public getItems(): Observable<Item[]> {
    return of(this.items);
  }

  public getItem(id: number): Observable<Item> {
    const item = this.items.find(p => p.id === id);

    return of(item);
  }

  public register(item: Item): Observable<Item> {
    const maxItem = this.items.reduce((a: Item, b: Item) => a.id < b.id ? b : a);
    const nextId = maxItem.id + 1;

    item.id = nextId;

    this.items.push(item);

    return of(item);
  }

  public update(item: Item): Observable<Item> {
    const index = this.items.findIndex(p => p.id === item.id);

    if (index < 0) {
      return throwError(new Error(`Cannot find item [${item.name}] to update.`));
    }

    this.items[index] = item;
    return of(item);
  }
}
