import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from 'src/app/components/profile/profile-card/profile-card.component';
import { ProfileDetailCardComponent } from 'src/app/components/profile/profile-detail-card/profile-detail-card.component';
import { RouterModule } from '@angular/router';

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
export class ProfilePageComponent {}
