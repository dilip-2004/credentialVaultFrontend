import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-change',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './name-change.component.html',
  styleUrl: './name-change.component.css'
})
export class NameChangeComponent {
  nameForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitting = true;

    if (this.nameForm.invalid) {
      this.isSubmitting = false;
      return;
    }

    const name = this.nameForm.value.name;

    this.authService.updateName({ name }).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = res.message;
        this.nameForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong';
        this.isSubmitting = false;
      }
    });
  }
}

