import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl', './app.component.css']
})
export class AppComponent {
  title = 'mean-app';

  storedPosts = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
