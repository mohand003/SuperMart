import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your store products and categories</p>
        </div>
        
        <div class="admin-menu">
          <div class="admin-card">
            <h3>Product Management</h3>
            <p>Add, edit, or remove products from your inventory</p>
            <a routerLink="/admin/products" class="btn btn-primary">Manage Products</a>
          </div>
          
          <div class="admin-card">
            <h3>Category Management</h3>
            <p>Organize your store with product categories</p>
            <a routerLink="/admin/categories" class="btn btn-primary">Manage Categories</a>
          </div>
          
          <div class="admin-card">
            <h3>Store Settings</h3>
            <p>Configure your store settings and preferences</p>
            <a routerLink="/admin/settings" class="btn btn-primary">Store Settings</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 2rem 0;
    }
    
    .admin-menu {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .admin-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 1.5rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .admin-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    
    .admin-card h3 {
      margin-top: 0;
      color: #2c3e50;
    }
    
    .admin-card .btn {
      margin-top: 1rem;
      display: inline-block;
    }
  `]
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService) {}
}