import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-detail-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-detail-card.component.html',
  styleUrls: ['./profile-detail-card.component.scss'],
})
export default class ProfileDetailCardComponent {
  @Input() user!: User;
  @Output() Edit: EventEmitter<any> = new EventEmitter();

  onEdit() {
    this.Edit.emit(true);
  }
}
