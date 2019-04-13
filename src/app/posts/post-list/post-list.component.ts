import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  // posts =[
  //   {title: 'First', content: 'This is the first post content.'},
  //   {title: 'Second', content: 'This is the second post content.'},
  //   {title: 'Third', content: 'This is the third post content.'}
  // ];

  @Input() posts = [];
}
