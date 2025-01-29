import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string): Observable<{ name: string }> {
    const post: Post = { title, content };
    return this.http.post<{ name: string }>(
      this.apiUrl,
      post
    ).pipe(
      catchError(errorRes => {
        this.error.next(errorRes.message);
        return throwError(() => errorRes);
      })
    );
  }

  fetchPosts(): Observable<Post[]> {
    const params = new HttpParams();
    params.append('print', 'pretty');
    params.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Post }>(this.apiUrl, {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello!'
        }),
        //params: new HttpParams().set('print', 'pretty'),//et ei lähe tarvis urli lõppu &print=pretty
        params
      })
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          return throwError(() => errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(this.apiUrl);
  }

}
