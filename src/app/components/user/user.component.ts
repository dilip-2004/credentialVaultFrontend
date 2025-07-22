import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../interfaces/admin';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  imports: [DatePipe,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user!: User;
  credentialCount: number = 0;
  yourId:string | null = '';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.yourId = this.authService.getUserId()

    if (userId) {
      this.adminService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data.user;
          this.credentialCount = data.CredentialsCount;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to fetch user', err);
          this.isLoading = false;
        }
      });
    } else {
      console.warn('No user ID found in route');
      this.isLoading = false;
    }
  }
}
