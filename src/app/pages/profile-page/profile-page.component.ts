import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from 'src/app/components/profile/profile-card/profile-card.component';
import { ProfileDetailCardComponent } from 'src/app/components/profile/profile-detail-card/profile-detail-card.component';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { take } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileCardComponent,
    ProfileDetailCardComponent,
    RouterModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  id!: number;
  user!: User;

  ngOnInit(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.id = +user!.id;
    });

    if (this.id) {
      this.userService
        .getUserById(+this.id)
        .pipe(take(1))
        .subscribe((user) => {
          console.log(user);
          this.user = user;
        });
    }
  }
}
