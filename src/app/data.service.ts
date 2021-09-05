import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './BookDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  configUrl = "https://jsonplaceholder.typicode.com/todos/";
  constructor(private http: HttpClient) { }

  getBookDetails(): Observable<Book[]> {
    return this.http.get<Book[]>(this.configUrl);
  }
}
