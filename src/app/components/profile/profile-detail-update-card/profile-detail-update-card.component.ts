import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-detail-update-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-detail-update-card.component.html',
  styleUrls: ['./profile-detail-update-card.component.scss'],
})
export class ProfileDetailUpdateCardComponent {
  @Input() user!: User;
}
