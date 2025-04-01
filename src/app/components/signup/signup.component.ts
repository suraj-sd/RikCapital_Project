import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginandsignupService } from '../../services/loginandsignup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  errorMessage: string = '';

  constructor(
    private authService: LoginandsignupService,
    private router: Router
  ) {}

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.authService
      .createAdmin({ email, password, userType: 'admin' })
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('Registration successful! Please log in.');
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.msg;
          }
        },
        error: (error) => {
          this.errorMessage = error.error.msg || 'Registration failed';
        },
      });
  }

  reset(form: NgForm) {
    form.resetForm();
    this.errorMessage = '';
  }
}
