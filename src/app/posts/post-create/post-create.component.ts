import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter();

  // newPost = '';

  // onAddPost(postInput: HTMLTextAreaElement) {
  //   this.newPost = 'The user\'s post';
  //   // console.dir(postInput);
  //   this.newPost = postInput.value;
  // }

  onAddPost() {
    // this.newPost = this.enteredValue;

    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
  }
}
