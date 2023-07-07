import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, subscribeOn } from 'rxjs';
import { SearchResult } from './movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  public getAll(page: number): Observable<SearchResult> {
    const result = this.http.get<SearchResult>(
      `http://www.omdbapi.com/?s=Batman&page=${page}&apikey=946b10d1`
    );

    result.subscribe((data) => {
      data.Search.map((item) => {
        console.log('service ', page, item['Title']);
      });
    });

    return result;
  }
}
// https://www.omdbapi.com/?s=Batman&page=2
