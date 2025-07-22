import { Routes } from '@angular/router';
import { authGuard } from './gaurd/auth.gaurd';
import { guestGuard } from './gaurd/guest.gaurd';
import { roleGuard } from './gaurd/role.gaurd';
import { signupGuard } from './gaurd/signup.gaurd';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddCredComponent } from './pages/add-cred/add-cred.component';
import { ShowCredComponent } from './pages/show-cred/show-cred.component';
import { UpdateCredComponent } from './pages/update-cred/update-cred.component';

import { AdminHomeComponent } from './pages/admin-home/admin-home.component';

import { ErrorComponent } from './common/error/error.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Auth Routes (accessible only to guests)
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'email-verification', component: EmailVerificationComponent },
      { 
        path: 'signup', 
        component: SignupComponent,
        canActivate: [signupGuard]
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  
// User Routes (accessible only to authenticated users)
  {
    path: '',
    canActivate: [authGuard],
    data: { expectedRole: 'User' },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'add-credential', component: AddCredComponent },
      { path: 'credential/:id', component: ShowCredComponent },
      { path: 'update-credential/:id', component: UpdateCredComponent },
      { path: 'name-change', loadComponent: () => import('./components/name-change/name-change.component').then(m => m.NameChangeComponent) },
      { path: 'password-change', loadComponent: () => import('./components/password-change/password-change.component').then(m => m.PasswordChangeComponent) }
    ]
  },
  
  // Admin Routes (accessible only to admin users)
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Admin' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usersTable', component: UsersTableComponent },
      { path: 'user/:id', component: UserComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Error Pages
  { path: 'error', component: ErrorComponent },
  
  // Wildcard route - must be last
  { path: '**', redirectTo: '/error' }
];
