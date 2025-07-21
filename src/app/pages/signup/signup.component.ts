import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { SignupRequest } from '../../interfaces/users';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  message = '';
  error = '';
  verifiedEmail = '';
  verifiedName = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    // Get email and name from query parameters (from email verification)
    this.route.queryParams.subscribe(params => {
      if (params['email'] && params['name']) {
        this.verifiedEmail = decodeURIComponent(params['email']);
        this.verifiedName = decodeURIComponent(params['name']);
        
        // Pre-populate the form with verified data
        this.signupForm.patchValue({
          email: this.verifiedEmail,
          name: this.verifiedName
        });
        
        // Disable email and name fields since they're verified
        this.signupForm.get('email')?.disable();
        this.signupForm.get('name')?.disable();
      } else {
        // If no verified email/name, redirect to email verification
        this.router.navigate(['/auth/email-verification']);
      }
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.message = '';

    // Use the verified email and name for registration
    const signupData: SignupRequest = {
      name: this.verifiedName,
      email: this.verifiedEmail,
      password: this.signupForm.get('password')?.value
    };

    this.authService.register(signupData).subscribe({
      next: (response) => {
        this.message = response.message;
        this.isLoading = false;
        this.signupForm.reset();
        
        // Redirect to login after successful signup
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}

