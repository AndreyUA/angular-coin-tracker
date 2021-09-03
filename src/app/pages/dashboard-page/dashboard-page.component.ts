import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { ApiService } from 'src/app/api.service';
import { SocketioService } from 'src/app/socketio.service';

// Store
import { Store, select } from '@ngrx/store';
import { getPosts } from 'src/app/state/posts';
import { getFamily } from 'src/app/state/family';

// Interfaces
import { IPost } from 'src/app/state/posts/posts.reducer';
import { IFamily } from 'src/app/state/family/family.reducer';

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

  familyId: string | null = null;

  postsForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private store: Store,
    private socketioService: SocketioService
  ) {}

  onSubmit() {
    if (this.familyPersonName !== null) {
      if (this.familyId)
        // TODO: think about ERRORS
        this.socketioService.sendPost(this.familyId, {
          text: this.postsForm.value.text,
          name: this.familyPersonName,
        });

      this.textInput.nativeElement.blur();
      this.postsForm.reset();
    }
  }

  removeHandler(id: string) {
    this.apiService.deletePost(id);
  }

  ngOnInit(): void {
    this.familyPersonName = localStorage.getItem('person');

    this.apiService.getAllposts();

    this.store.pipe(select(getPosts)).subscribe((posts: Array<IPost>) => {
      this.posts = posts;
    });

    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      this.familyId = family._id;
    });

    this.postsForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        DashboardValidator.invalidDashboardFrom,
      ]),
    });
  }
}
