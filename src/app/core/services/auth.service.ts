import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { UserIdentity, UserFormValues } from '../models/user.model';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authorizedUser = new BehaviorSubject<UserIdentity | null>(null);
  public authorizedUser$ = this.authorizedUser.asObservable();

  public isInitialized = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  public get currentUserValue() {
    return this.authorizedUser.getValue();
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  login(credentials: UserFormValues) {
    return this.apiService.login(credentials).pipe(
      tap(user => {
        localStorage.setItem('jwt', user.token);
        this.authorizedUser.next(user);
        this.router.navigate(['/posts']);
      })
    );
  }

  register(credentials: UserFormValues) {
    return this.apiService.register(credentials).pipe(
      tap(user => {
        localStorage.setItem('jwt', user.token);
        this.authorizedUser.next(user);
        this.router.navigate(['/posts']);
      })
    );
  }

  getCurrentUser() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      // If no token, we know the user isn't logged in.
      this.isInitialized.next(true);
      return of(null);
    }

    // If a token exists, try to fetch the user
    return this.apiService.getCurrentUser().pipe(
      tap(user => {
        this.authorizedUser.next(user);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      }),
      finalize(() => {
        this.isInitialized.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.authorizedUser.next(null);
    this.router.navigate(['/auth/login']);
  }
}
