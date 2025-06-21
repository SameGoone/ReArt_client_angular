import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

import { AuthService } from '../../../../core/services/auth.service';
import { UserFormValues } from '../../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  // Corrected line:
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // ... the rest of the component logic remains exactly the same
  registerForm!: FormGroup;
  isSubmitting = false;
  registerError: string[] | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.registerError = null;
    const credentials: UserFormValues = this.registerForm.value;

    this.authService.register(credentials).pipe(
      finalize(() => this.isSubmitting = false),
      catchError((error) => {
        if (Array.isArray(error)) {
          this.registerError = error;
        } else {
          this.registerError = ['An unexpected error occurred. Please try again.'];
        }
        return new Observable<never>();
      })
    ).subscribe();
  }
}
