import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { ApiService } from 'src/app/services/api.service';
import { SocketioService } from 'src/app/services/socketio.service';

// Store
import { Store, select } from '@ngrx/store';
import { getPosts, getPostsIsFetching } from 'src/app/state/posts';
import { resetPosts } from 'src/app/state/posts/posts.actions';
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

  isFetching!: boolean;

  posts: [] | Array<IPost> = [];

  familyPersonName: string | null = null;

  familyId: string | null = null;

  postsForm!: FormGroup;

  isModalVisible: boolean = false;

  constructor(
    private apiService: ApiService,
    private store: Store,
    private socketioService: SocketioService
  ) {}

  private handleModal(bool: boolean): void {
    this.isModalVisible = bool;
  }

  openModal(): void {
    this.handleModal(true);
  }

  closeModal(): void {
    this.handleModal(false);
  }

  onSubmit() {
    this.closeModal();

    if (this.familyPersonName !== null) {
      if (this.familyId) {
        // TODO: think about ERRORS
        this.socketioService.sendPost(this.familyId, {
          text: this.postsForm.value.text,
          name: this.familyPersonName,
        });

        this.apiService.getAllposts();
      }

      this.textInput.nativeElement.blur();
      this.postsForm.reset();
    }
  }

  ngOnInit(): void {
    this.familyPersonName = localStorage.getItem('person');

    this.store.dispatch(resetPosts());

    this.apiService.getAllposts();

    this.store.pipe(select(getPosts)).subscribe((posts: Array<IPost>) => {
      this.posts = posts;
    });

    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      this.familyId = family._id;
    });

    this.store
      .pipe(select(getPostsIsFetching))
      .subscribe((isFetching: boolean) => {
        this.isFetching = isFetching;
      });

    this.postsForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        DashboardValidator.invalidDashboardFrom,
      ]),
    });
  }
}
