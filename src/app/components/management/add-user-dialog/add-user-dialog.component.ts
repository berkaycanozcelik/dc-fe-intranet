import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private userService: UserService
  ) {}

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    address: '',
    phoneNumber: '',
    birthday: '',
    title: '',
    manager: '',
    team: '',
  };

  isEditMode = false;

  ngOnInit() {
    if (this.data) {
      this.user = {
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        password: this.data.password,
        role: this.data.role,
        address: this.data.address,
        phoneNumber: this.data.phoneNumber,
        birthday: this.data.birthday,
        title: this.data.title,
        manager: this.data.manager,
        team: this.data.team,
      };
      this.isEditMode = true;
    }
  }

  onSubmit(form: NgForm) {
    if (!this.isEditMode) {
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
    } else {
      console.log(form.value);
      
      this.userService.updateUser(this.data.id, form.value).subscribe(
        (res) => {
          this.dialogRef.close();
          console.log('updated', res);
        },
        (err) => {
          console.log('error by update', err);
        }
      );
    }

    form.reset();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
