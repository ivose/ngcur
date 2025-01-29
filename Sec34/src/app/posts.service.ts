import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const post : Post = {title,content}:
    this.http.post<{name:string}>(
      'http://localhost:3000/posts.json',
      post
    ).subscribe(resp => {
      console.log(resp);
    });
  }
}
