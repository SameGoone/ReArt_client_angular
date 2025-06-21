import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
import { PostDetailsDto } from '../models/post.model';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // A BehaviorSubject to hold the array of posts. Private to prevent outside modification.
  private readonly _posts = new BehaviorSubject<PostDetailsDto[]>([]);
  // The public observable that components will subscribe to.
  readonly posts$ = this._posts.asObservable();

  private readonly _selectedPost = new BehaviorSubject<PostDetailsDto | null>(null);
  readonly selectedPost$ = this._selectedPost.asObservable();

  // A BehaviorSubject to track the initial loading state.
  private readonly _isLoading = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this._isLoading.asObservable();

  constructor(private apiService: ApiService) { }

  // Getter to synchronously access the current value of posts
  get currentPosts(): PostDetailsDto[] {
    return this._posts.getValue();
  }

  loadPosts() {
    this._isLoading.next(true);

    this.apiService.getPosts().pipe(
      tap(posts => {
        this._posts.next(posts);
        this._isLoading.next(false);
      }),
    ).subscribe();
  }

  loadPost(id: string) {
    this._isLoading.next(true);

    const cachedPost = this.currentPosts.find(p => p.id === id);
    if (cachedPost) {
      this._selectedPost.next(cachedPost);
      this._isLoading.next(false);
      return of(cachedPost);
    }

    return this.apiService.getPost(id).pipe(
      tap(post => {
        this._selectedPost.next(post);
        this._isLoading.next(false);
      })
    );
  }
}
