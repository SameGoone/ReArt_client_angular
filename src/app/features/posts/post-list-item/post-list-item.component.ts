import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostDetailsDto } from '../../../core/models/post.model';

@Component({
  selector: 'post-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent {
  @Input() post!: PostDetailsDto;
}
