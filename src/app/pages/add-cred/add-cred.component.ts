import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CredentialsService } from '../../services/credentials.service';
import { Router, RouterModule } from '@angular/router';
import { CredentialsPostRequest } from '../../interfaces/credentials';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-cred',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-cred.component.html',
  styleUrl: './add-cred.component.css'
})
export class AddCredComponent {
  credentialForm: FormGroup;
  isSubmitting:boolean = false;
  errorMessage:string = '';
  successMessage:string = '';
  showPassword = false;

  constructor(private authService:AuthService,private credentialsService:CredentialsService, private router:Router) {
    this.credentialForm = new  FormGroup({
      appName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      appUserName: new FormControl('', Validators.required),
      appPassword: new FormControl('', [Validators.required]),
      appLink: new FormControl('')
    });
  }

  get f() {
    return this.credentialForm.controls;
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.credentialForm.invalid) {
      this.credentialForm.markAllAsTouched();
      return;
    }
    
    const payload: CredentialsPostRequest = this.credentialForm.value;

    this.credentialsService.postCredentials(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.isSubmitting = false;
        this.successMessage = 'Credential added successfully!';
        this.credentialForm.reset();
        setTimeout(() => this.router.navigate(['/home']), 1000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Something went wrong!';
      },
      complete: () => this.isSubmitting = false
    });
  }
}

