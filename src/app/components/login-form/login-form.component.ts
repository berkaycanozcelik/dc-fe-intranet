import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password).subscribe(
      (response) => {
        sessionStorage.setItem('token', JSON.stringify(response));
        this.isLoading = false;
        this.router.navigate(['/']);
        form.reset();
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
  }
}
