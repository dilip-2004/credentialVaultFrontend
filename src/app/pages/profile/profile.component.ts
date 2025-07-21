import { DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserProfile } from '../../interfaces/users';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  imports: [ DatePipe, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: UserProfile | null = null;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (userData) => (this.user = userData)
    });

    this.authService.getProfile().subscribe({
      next: (data) => (this.user = data),
      error: (err) => console.error('Failed to load profile', err)
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearMethod();
        this.router.navigate(['/auth/login']);
      },
      error: (err:HttpErrorResponse)=> {
        console.error('Logout failed', err);
      }
    })
  }
}
