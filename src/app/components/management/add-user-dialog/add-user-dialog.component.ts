import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, FormsModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.register(form.value).subscribe(
      (res) => {
        this.dialogRef.close();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    form.reset();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
