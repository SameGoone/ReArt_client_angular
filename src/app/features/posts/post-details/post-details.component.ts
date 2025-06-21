import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Import ActivatedRoute and RouterLink
import { PostService } from '../../../core/services/post.service';
import { Observable } from 'rxjs';
import { PostDetailsDto } from '../../../core/models/post.model';

@Component({
  selector: 'post-details',
  standalone: true,
  imports: [CommonModule, RouterLink], // Add RouterLink
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  selectedPost$: Observable<PostDetailsDto | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute // Inject ActivatedRoute to get URL params
  ) {
    this.selectedPost$ = this.postService.selectedPost$;
    this.isLoading$ = this.postService.isLoading$;
  }

  ngOnInit(): void {
    // Get the 'id' from the URL snapshot
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.loadPost(id).subscribe();
    }
  }
}
