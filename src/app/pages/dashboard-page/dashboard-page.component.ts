import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { ApiService } from 'src/app/api.service';

// Store
import { Store, select } from '@ngrx/store';
import { getPosts } from 'src/app/state/posts';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';

// Custom validators
import { DashboardValidator } from './dashboard-validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('textInput', { static: false }) textInput!: ElementRef;

  posts: [] | Array<IPost> = [];

  familyPersonName: string | null = null;

  postsForm!: FormGroup;

  constructor(private apiService: ApiService, private store: Store) {}

  onSubmit() {
    if (this.familyPersonName !== null) {
      this.apiService.addNewPost(
        this.familyPersonName,
        this.postsForm.value.text
      );

      this.textInput.nativeElement.blur();
      this.postsForm.reset();
    }
  }

  ngOnInit(): void {
    this.familyPersonName = localStorage.getItem('person');

    this.apiService.getAllposts();

    this.store.pipe(select(getPosts)).subscribe((posts) => {
      this.posts = posts;
    });

    this.postsForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        DashboardValidator.invalidDashboardFrom,
      ]),
    });
  }
}
