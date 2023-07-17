import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/services/login/login.service';
import { LoginData } from 'src/app/models/loginData';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';

  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  submitForm() {
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        sessionStorage.setItem('token', response.token);
        this.isLoggedIn = true;
        if (this.isLoggedIn) {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
