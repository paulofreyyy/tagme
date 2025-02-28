import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = `http://localhost:3000/items`;
    private cacheExpiration = 5 * 60 * 1000; //5 minutos
    private lastFetchTime = 0
    private cache: Item[] | null = null

    constructor(private http: HttpClient) { }

    getItems(): Observable<any> {
        const now = Date.now();
        if (this.cache && now - this.lastFetchTime < this.cacheExpiration) {
            return of(this.cache)
        }

        return this.http.get<Item[]>(this.apiUrl).pipe(
            tap(data => {
                this.cache = data;
                this.lastFetchTime = now
            })
        );
    }

    getItemById(id: string): Observable<Item> {
        return this.http.get<Item>(`${this.apiUrl}/${id}`);
    }

    createItem(item: Item): Observable<Item> {
        return this.http.post<Item>(this.apiUrl, item).pipe(
            tap((newItem) => {
                if (this.cache) {
                    this.cache = [...this.cache, newItem];
                } else {
                    this.cache = [newItem];
                }
            })
        );
    }


    updateItem(id: string, updatedItem: Item): Observable<Item> {
        return this.http.put<Item>(`${this.apiUrl}/${id}`, updatedItem).pipe(
            tap((updatedItemResponse) => {
                if (this.cache) {
                    const index = this.cache.findIndex(item => item._id === updatedItemResponse._id);
                    if (index !== -1) {
                        this.cache[index] = updatedItemResponse;
                    }
                }
            })
        );
    }


    deleteItem(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.cache = this.cache ? this.cache.filter(item => item._id !== id) : null
            })
        )
    }
}
