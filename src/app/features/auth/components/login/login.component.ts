import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AuthService } from '../../../../core/services/auth.service';
import { UserFormValues } from '../../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  // Corrected line:
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // ... the rest of the component logic remains exactly the same
  loginForm!: FormGroup;
  isSubmitting = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.loginError = null;
    const credentials: UserFormValues = this.loginForm.value;

    this.authService.login(credentials).pipe(
      finalize(() => this.isSubmitting = false),
      catchError((error) => {
        this.loginError = 'Invalid email or password.';
        return new Observable<never>();
      })
    ).subscribe();
  }
}
