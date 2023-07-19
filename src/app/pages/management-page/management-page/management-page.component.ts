import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from 'src/app/components/management/user/user.component';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [CommonModule, UserComponent],
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss']
})
export class ManagementPageComponent {

}
