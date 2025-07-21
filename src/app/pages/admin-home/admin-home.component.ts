import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from "../../components/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-admin-home',
  imports: [ RouterOutlet, AdminNavbarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
