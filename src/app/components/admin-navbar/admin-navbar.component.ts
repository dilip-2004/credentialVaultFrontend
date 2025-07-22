import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private authService:AuthService, private router:Router) { }

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
