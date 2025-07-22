import { Component } from '@angular/core';
import { User, GetAllUsersResponse } from '../../interfaces/admin';
import { AdminService } from '../../services/admin.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users-table',
  imports: [DatePipe,CommonModule,FormsModule,RouterLink],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  users: User[] = [];
  loading = false;
  yourId:string | null ='';

  currentPage = 1;
  totalPages = 1;
  limit = 5;

  searchText = '';
  sortBy = 'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(private adminService: AdminService, private authService:AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.yourId = this.authService.getUserId();
  }

  loadUsers(): void {
    this.loading = true;
    this.adminService
      .getAllUsers({
        page: this.currentPage,
        limit: this.limit,
        search: this.searchText,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      })
      .subscribe({
        next: (res: GetAllUsersResponse) => {
          this.users = res.users;
          this.totalPages = res.totalPages;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load users', err);
          this.loading = false;
        },
      });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  onSortOrderChange() {
    this.currentPage = 1;
    this.loadUsers();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }
}
