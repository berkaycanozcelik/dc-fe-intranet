import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/services/login/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.loginService.login(form.value.email, form.value.password).subscribe(
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
