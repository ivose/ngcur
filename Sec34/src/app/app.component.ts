// app.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub : Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
      .subscribe({
        next: () => {
          this.fetchPosts();
        },
        error: error => {
          this.error = error.message;
        }
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe({
      next: () => {
        this.loadedPosts = [];
      },
      error: error => {
        this.error = error.message;
      }
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe({
      next: posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: error => {
        this.isFetching = false;
        this.error = error.message;
      }
    });
  }

  onHandleError() {
    this.error = null;
  }
}
