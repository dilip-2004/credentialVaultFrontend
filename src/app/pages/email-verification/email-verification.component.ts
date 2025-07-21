import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailVerificationService } from '../../services/email-verification.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
  verificationForm: FormGroup;
  isLoading = false;
  message = '';
  error = '';
  emailSent = false;

  constructor(
    private emailVerificationService: EmailVerificationService,
    private router: Router
  ) {
    this.verificationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit(): void {
    if (this.verificationForm.invalid) {
      this.verificationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.message = '';

    const { email, name } = this.verificationForm.value;

    this.emailVerificationService.sendVerificationEmail(email, name).subscribe({
      next: (response) => {
        this.message = response.message;
        this.emailSent = true;
        this.isLoading = false;
        this.verificationForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.message || 'Failed to send verification email. Please try again.';
        this.isLoading = false;
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  get f() {
    return this.verificationForm.controls;
  }
}

