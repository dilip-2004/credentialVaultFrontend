import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
  private apiUrl = 'http://localhost:5000/api/email';

  constructor(private http: HttpClient) {}

  sendVerificationEmail(email: string, name: string): Observable<EmailVerificationResponse> {
    return this.http.post<EmailVerificationResponse>(`${this.apiUrl}/send-verification-email`, { email, name });
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify/${token}`);
  }
}

