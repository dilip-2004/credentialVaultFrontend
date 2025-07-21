import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserProfile, NameChangeRequest, PasswordChangeRequest, ProfileUpdateResponse, LoginRequest, LoginResponse, RefreshTokenResponse, SignupRequest, SignupResponse } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private accessToken: string | null = null;
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  register(userData: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/register`, userData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true });
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`);
  }

  updateName(data: NameChangeRequest): Observable<ProfileUpdateResponse> {
    return this.http.put<ProfileUpdateResponse>(`${this.apiUrl}/namechange`, data);
  }

  updatePassword(data: PasswordChangeRequest): Observable<ProfileUpdateResponse> {
    return this.http.put<ProfileUpdateResponse>(`${this.apiUrl}/passwordchange`, data);
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setUser(user: UserProfile): void {
    this.userSubject.next(user);
  }

  getUser(): UserProfile | null {
    return this.userSubject.value;
  }

  getUserId(): string | null {
    const user = this.getUser();
    return user ? user._id : null;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  clearMethod(): void {
    this.accessToken = null;
    this.userSubject.next(null);
  }
}