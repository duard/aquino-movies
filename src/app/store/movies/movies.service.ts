import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, subscribeOn } from 'rxjs';
import { MovieDetail, SearchResult } from './movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  public getSearchMovies(page: number): Observable<SearchResult> {
    const result = this.http.get<SearchResult>(
      `http://www.omdbapi.com/?s=Batman&page=${page}&apikey=946b10d1`
    );
    console.log(`http://www.omdbapi.com/?s=Batman&page=${page}`);

    return result;
  }

  // https://www.omdbapi.com/?i=tt0372784&apikey=946b10d1
  // https://www.omdbapi.com/?s=Batman&page=28&apikey=946b10d1
  // https://www.omdbapi.com/?i=tt0372784&apikey=946b10d1

  public getMovieById(movieId: string): Observable<MovieDetail> {
    const result = this.http.get<MovieDetail>(
      `https://www.omdbapi.com/?i=${movieId}&apikey=946b10d1`
    );

    return result;
  }
}
// https://www.omdbapi.com/?s=Batman&page=2
