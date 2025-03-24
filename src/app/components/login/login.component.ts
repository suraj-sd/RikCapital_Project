import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginandsignupService } from '../../services/loginandsignup.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: LoginandsignupService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.loginForm.reset();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.loginAdminAndUser(email, password).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);

          // Show success popup
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in!',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            // Reload the page after showing success message
            window.location.reload();
          });

          this.router.navigate(['/']);
        } else {
          this.showErrorPopup(response.msg);
        }
      },
      error: (error) => {
        this.showErrorPopup(error.error.msg || 'Login failed');
      },
    });
  }

  // Function to show error popups
  showErrorPopup(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: message,
      confirmButtonText: 'OK',
    });
  }

  reset() {
    this.loginForm.reset();
    this.errorMessage = '';
  }
}
