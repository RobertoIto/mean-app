import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post.model';

// With the @Injectable({providedIn: 'root'}) this class will
// be used by the entire project with only one instance.
// This service is to avoid binding outputs and inputs
// among many components. All the components will access direct
// this service.
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(sTitle: string, sContent: string) {
    const post: Post = { id: null, title: sTitle, content: sContent };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
