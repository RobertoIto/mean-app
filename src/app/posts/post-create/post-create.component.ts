import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredValue = '';
  newPost = '';

  // onAddPost(postInput: HTMLTextAreaElement) {
  //   this.newPost = 'The user\'s post';
  //   // console.dir(postInput);
  //   this.newPost = postInput.value;
  // }

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
