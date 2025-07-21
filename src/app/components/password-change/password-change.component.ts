import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-change',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent {
  passwordForm: FormGroup;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  toggleVisibility(field: 'current' | 'new' | 'confirm') {
    if (field === 'current') this.showOldPassword = !this.showOldPassword;
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    if (field === 'confirm') this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitting = true;

    if (this.passwordForm.invalid || this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.errorMessage = this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword
        ? 'New password and confirm password do not match.'
        : 'Please enter valid password in the form.';
      this.isSubmitting = false;
      return;
    }

    const payload = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.authService.updatePassword(payload).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Password changed successfully.';
        this.passwordForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong.';
        this.isSubmitting = false;
      }
    });
  }
}

