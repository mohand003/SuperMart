import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              <h2>🛒 SuperMart</h2>
            </a>
          </div>
          
          <nav class="nav-menu">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a routerLink="/categories" routerLinkActive="active">Categories</a>
            <a routerLink="/products" routerLinkActive="active">Products</a>
            <a routerLink="/best-offers" routerLinkActive="active">Best Offers</a>
            <a routerLink="/contact" routerLinkActive="active">Contact</a>
            <a routerLink="/admin" routerLinkActive="active" *ngIf="isAdmin">Admin</a>
          </nav>
          
          <div class="header-actions">
            <a routerLink="/profile" class="profile-link">
              <span class="icon">👤</span>
              Profile
            </a>
            <a routerLink="/cart" class="cart-link">
              <span class="icon">🛒</span>
              Cart
              <span class="cart-count" *ngIf="(cartCount$ | async)! > 0">
                {{ cartCount$ | async }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #2c3e50, #34495e);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
    
    .logo a {
      text-decoration: none;
      color: white;
    }
    
    .logo h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
    }
    
    .nav-menu {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .nav-menu a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .nav-menu a:hover,
    .nav-menu a.active {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    
    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .profile-link,
    .cart-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .profile-link:hover,
    .cart-link:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .icon {
      font-size: 1.2rem;
    }
    
    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #e74c3c;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }
      
      .nav-menu {
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .nav-menu a {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  cartCount$: Observable<number>;
  isAdmin: boolean = false;
  
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartCount$ = this.cartService.getCartCount();
  }
  
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.isAdmin = user?.isAdmin || false;
    });
  }
}