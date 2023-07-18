import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/services/login/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  isLoading = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.loginService.login(form.value.email, form.value.password).subscribe(
      (response) => {
        sessionStorage.setItem('token', response.token);
        this.isLoading = false;
        this.router.navigate(['/']);
        form.reset();
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}
