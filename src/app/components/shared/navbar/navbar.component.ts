import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { authUser } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub: Subscription | undefined;
  user: authUser | null | undefined;
  isAuthenticated: boolean = false;
  role: Role = Role.EMPLOYEE;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
