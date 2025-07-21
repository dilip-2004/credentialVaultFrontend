import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CredentialsGetResponseByID, DecryptCredentialRequest, DecryptCredentialResponse } from '../../interfaces/credentials';
import { CredentialsService } from '../../services/credentials.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-cred',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './show-cred.component.html',
  styleUrl: './show-cred.component.css'
})
export class ShowCredComponent {
  credentialId!: string;
  credential: CredentialsGetResponseByID | null = null;
  decryptedPassword: string | null = null;
  error = '';
  loading = false;
  showForm = false;

  passwordForm = new FormGroup({
    userPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private route: ActivatedRoute,
    private credentialService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.credentialId = this.route.snapshot.paramMap.get('id') || '';
    if (this.credentialId) {
      this.credentialService.getCredentialsByID(this.credentialId).subscribe({
        next: (res) => (this.credential = res),
        error: () => (this.error = 'Failed to load credential')
      });
    }
  }

  get f() {
    return this.passwordForm.controls;
  }

  onDecrypt(): void {
    this.error = '';
    this.decryptedPassword = null;

    if (this.passwordForm.invalid) return;

    this.loading = true;
    const payload: DecryptCredentialRequest = {
      credentialId: this.credentialId,
      userPassword: this.passwordForm.value.userPassword!
    };

    this.credentialService.decryptCredential(payload).subscribe({
      next: (res: DecryptCredentialResponse) => {
        console.log(res);
        this.decryptedPassword = res.decryptedPassword;
        this.loading = false;
        this.passwordForm.reset();
        this.showForm = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.error = err.error?.message || 'Decryption failed';
        this.loading = false;
      }
    });
  }
}

