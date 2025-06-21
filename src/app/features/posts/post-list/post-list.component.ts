import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsDto } from '../../../core/models/post.model';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';

@Component({
  selector: 'post-list',
  standalone: true,
  imports: [CommonModule, PostListItemComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts: PostDetailsDto[] | null = [];
}
