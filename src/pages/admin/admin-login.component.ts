import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-login fade-in">
      <div class="container">
        <div class="login-container">
          <div class="login-header">
            <h2>Admin Login</h2>
            <p>Sign in to access the admin dashboard</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                [(ngModel)]="username" 
                required 
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                [(ngModel)]="password" 
                required 
                class="form-control"
              />
            </div>
            
            <div class="error-message" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary" [disabled]="!loginForm.valid">
                Sign In
              </button>
            </div>
            
            <div class="login-info">
              <p><strong>Demo Credentials:</strong></p>
              <p>Username: admin</p>
              <p>Password: admin123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-login {
      padding: 4rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
    }
    
    .login-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      padding: 2rem;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .login-header h2 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .error-message {
      color: #dc3545;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    
    .form-actions {
      margin-top: 1.5rem;
    }
    
    .form-actions .btn {
      width: 100%;
    }
    
    .login-info {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      font-size: 0.875rem;
    }
    
    .login-info p {
      margin: 0.25rem 0;
    }
  `]
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  onSubmit(): void {
    this.errorMessage = '';
    
    const success = this.authService.login(this.username, this.password);
    
    if (success) {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}