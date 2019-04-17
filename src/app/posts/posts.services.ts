import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';
import { Title } from '@angular/platform-browser';
import { sanitizeIdentifier } from '@angular/compiler';

// With the @Injectable({providedIn: 'root'}) this class will
// be used by the entire project with only one instance.
// This service is to avoid binding outputs and inputs
// among many components. All the components will access direct
// this service.
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    // Clone the posts and use the find function
    // return {...this.posts.find(p => p.id === id)};

    // This code is to avoid that the record desappear after a
    // refresh in the page post-create.component because the previous
    // getPosts are called only in the post-list.component.
    // Important: It is not possible to subscribe in a return so
    // the subscription will be made in post-create.component.ts.
    // We have to specify the return object from get through the parameters
    // between <> because get is a generic method.
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string
    }>('http://localhost:3000/api/posts/' + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(sTitle: string, sContent: string, bImage: File) {
    const postData = new FormData();
    postData.append('title', sTitle);
    postData.append('content', sContent);
    postData.append('image', bImage, sTitle);

    this.http
      .post<{message: string, post: Post}>(
        'http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        const post: Post = {
          id: responseData.post.id,
          title: sTitle,
          content: sContent,
          imagePath: responseData.post.imagePath};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        // this command just redirects to the post-list.component page.
        this.router.navigate(['/']);
      });
  }

  updatePost(sId: string, sTitle: string, sContent: string, bsImage: File | string) {
    let postData: Post | FormData ;
    if (typeof(bsImage) === 'object') {
      postData = new FormData();
      postData.append('id', sId);
      postData.append('title', sTitle);
      postData.append('content', sContent);
      postData.append('image', bsImage);
    } else {
      postData = {
        id: sId,
        title: sTitle,
        content: sContent,
        imagePath: bsImage
      };
    }
    this.http
      .put('http://localhost:3000/api/posts/' + sId, postData)
      .subscribe(response => {
        console.log(response);
        // This is another code to avoid get all the data again from
        // the database server. After the successful update the
        // response will return.
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === sId);
        const post: Post = {
          id: sId,
          title: sTitle,
          content: sContent,
          imagePath: ''// response.imagePath
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next({...this.posts});
        // this command just redirects to the post-list.component page.
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
        // Filter the posts without the delete record and pass it to
        // the page without reloading the data from the database.
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
