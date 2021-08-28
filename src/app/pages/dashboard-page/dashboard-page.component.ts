import { Component, OnInit } from '@angular/core';

// Services
import { ApiService } from 'src/app/api.service';

// Store
import { Store, select } from '@ngrx/store';
import { getPosts } from 'src/app/state/posts';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  posts: [] | Array<IPost> = [];

  constructor(private apiService: ApiService, private store: Store) {}

  ngOnInit(): void {
    this.apiService.getAllposts();

    this.store.pipe(select(getPosts)).subscribe((posts) => {
      this.posts = posts;
    });
  }
}
