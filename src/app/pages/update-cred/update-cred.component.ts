import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CredentialsGetResponseByID, CredentialsUpdateRequest } from '../../interfaces/credentials';

@Component({
  selector: 'app-update-cred',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-cred.component.html',
  styleUrl: './update-cred.component.css'
})
export class UpdateCredComponent implements OnInit {
  updateForm: FormGroup;
  isLoading = false;
  message = '';
  error = '';
  credentialId = '';
  credential: CredentialsGetResponseByID | null = null;

  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = new FormGroup({
      appName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      appUserName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      appPassword: new FormControl('', [Validators.required]),
      appLink: new FormControl('', [Validators.maxLength(2048)])
    });
  }

  ngOnInit(): void {
    this.credentialId = this.route.snapshot.paramMap.get('id') || '';
    if (this.credentialId) {
      this.loadCredential();
    } else {
      this.router.navigate(['/credentials']);
    }
  }

  loadCredential(): void {
    this.isLoading = true;
    this.credentialsService.getCredentialsByID(this.credentialId).subscribe({
      next: (credential) => {
        this.credential = credential;
        this.updateForm.patchValue({
          appName: credential.appName,
          appUserName: credential.appUserName,
          appLink: credential.appLink || ''
        });
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.message || 'Failed to load credential';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.message = '';

    const updateData: CredentialsUpdateRequest = this.updateForm.value;

    this.credentialsService.updateCredentials(this.credentialId, updateData).subscribe({
      next: (response) => {
        console.log(response);
        this.message = response.message || 'Credential updated successfully!';
        this.isLoading = false;
        
        // Redirect to credentials list after successful update
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.message || 'Update failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  get f() {
    return this.updateForm.controls;
  }
}

