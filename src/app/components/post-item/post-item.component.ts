import { Component, OnInit, Input } from '@angular/core';

// Services
import { ApiService } from 'src/app/services/api.service';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post!: IPost;

  constructor(private apiService: ApiService) {}

  removeHandler(id: string) {
    this.apiService.deletePost(id);
  }

  ngOnInit(): void {}
}
