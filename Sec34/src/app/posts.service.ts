import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const post: Post = { title, content };
    this.http.post<{ name: string }>(
      this.apiUrl,
      post,{
        observe: 'response'
      }
    ).subscribe(
      responseData => {
        console.log(responseData);
      },
      error => {
        this.error.next(error.message);
      }
    );
  }

  fetchPosts(): Observable<Post[]> {
    const params = new HttpParams();
    params.append('print', 'pretty');
    params.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Post }>(this.apiUrl, {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello!
        }),
        //params: new HttpParams().set('print', 'pretty'),//et ei lähe tarvis urli lõppu &print=pretty
        params,
        responseType: 'json',
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
    return this.http.delete(
      this.apiUrl,
       {observe: 'events', responseType: 'text'}
      ).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Sent) {
        //..
      }
      if(event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }

}
