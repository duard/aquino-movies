import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from './movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<SearchResult> {
    console.log('bateu no service');

    return this.http.get<SearchResult>(
      `http://www.omdbapi.com/?s=Batman&apikey=946b10d1`
    );
  }
}
// https://www.omdbapi.com/?s=Batman&page=2
