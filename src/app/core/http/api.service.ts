import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserIdentity, UserFormValues } from '../models/user.model';
import { PostDetailsDto } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:5010/api';

  constructor(private http: HttpClient) { }

  login(credentials: UserFormValues) {
    return this.http.post<UserIdentity>(`${this.apiUrl}/users/login`, credentials);
  }

  register(credentials: UserFormValues) {
    return this.http.post<UserIdentity>(`${this.apiUrl}/users/register`, credentials);
  }

  getCurrentUser() {
    return this.http.get<UserIdentity>(`${this.apiUrl}/users`);
  }

  getPosts() {
    return this.http.get<PostDetailsDto[]>(`${this.apiUrl}/posts`);
  }

  getPost(id: string) {
    return this.http.get<PostDetailsDto>(`${this.apiUrl}/posts/${id}`);
  }
}
