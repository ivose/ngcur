import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isfetcgubg = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ name: string }>(
        'http://localhost:3000/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
        this.fetchPosts(); // Refresh posts after creating new one
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.http
      .delete('http://localhost:3000/posts.json')
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  private fetchPosts() {
    this.isfetcgubg = true;
    this.http
      .get<{ [key: string]: Post }>(
        'http://localhost:3000/posts.json'
      )
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isfetcgubg = false;
      });
  }
}
