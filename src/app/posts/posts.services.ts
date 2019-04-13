import { Injectable } from '@angular/core';
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

  getPosts() {
    // [...this.posts] creates a new array and not a reference
    // from this Post[] array. Avoiding manipulation into the
    // original Post[]
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(sTitle: string, sContent: string) {
    const post: Post = { title: sTitle, content: sContent };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
