import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostsService } from '../posts.services';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  // Now working with a form as a parameter, the angular code can
  // access all the html controls.
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  constructor(public postsService: PostsService) {}

}
