import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = `http://localhost:3000/items`;

    constructor(private http: HttpClient) { }

    getItems(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getItemById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    createItem(item: any): Observable<any> {
        return this.http.post(this.apiUrl, item);
    }

    updateItem(id: string, item: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, item);
    }

    deleteItem(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}
