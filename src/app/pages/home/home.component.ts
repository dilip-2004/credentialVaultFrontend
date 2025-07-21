import { Component } from '@angular/core';
import { CredentialsService } from '../../services/credentials.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Credentials, CredentialsGetResponse } from '../../interfaces/credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, DatePipe,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchControl = new FormControl('');
  sortControl = new FormControl('recent');
  currentPage:number = 1;
  totalPages:number = 5;
  credentials:Credentials[]=[];

  private destroy$ = new Subject<void>();

  constructor(private credentialsService:CredentialsService, private authService:AuthService) {}

  ngOnInit() {
    this.loadData();

    this.searchControl.valueChanges.pipe(debounceTime(300),takeUntil(this.destroy$)).subscribe(()=>{
      this.currentPage = 1;
      this.loadData();
    });

    this.sortControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(()=>{
      this.currentPage = 1;
      this.loadData();
    });
  }

  loadData() {
    const search = this.searchControl.value || '';
    const sort = this.sortControl.value || 'recent';
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error('User ID not found');
      return;
    }

    this.credentialsService.getCredentials(userId, {page:this.currentPage,limit:10,search:search,sort:sort}).subscribe({
      next: (res:CredentialsGetResponse)=> {
        this.credentials = res.credentials;
        this.totalPages = res.totalPages;
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  showCredentials() {

  }

  totalPage():number {
    return this.totalPages;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadData();
    }
  }

  confirmDelete(id: string): void {
    if (confirm('Are you sure you want to delete this credential?')) {
      this.credentialsService.deleteCredentials(id).subscribe({
        next: (res) => {
          console.log(res);
          this.credentials = this.credentials.filter(c => c.id !== id);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Delete failed:', err);
          alert('Error deleting credential. Please try again.');
        }
      });
    }
  }

  ngOnDestroy():void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

