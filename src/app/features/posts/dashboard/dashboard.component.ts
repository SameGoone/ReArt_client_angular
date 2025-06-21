import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostDetailsDto } from '../../../core/models/post.model';
import { PostService } from '../../../core/services/post.service';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts$: Observable<PostDetailsDto[]>;
  isLoading$: Observable<boolean>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.posts$;
    this.isLoading$ = this.postService.isLoading$;
  }

  ngOnInit(): void {
    if (this.postService.currentPosts.length === 0) {
      this.postService.loadPosts();
    }
  }
}
