import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { BestOffersComponent } from './pages/best-offers/best-offers.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';

// Import admin components
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';
import { ProductManagementComponent } from './pages/admin/product-management.component';
import { ProductFormComponent } from './pages/admin/product-form.component';
import { AdminLoginComponent } from './pages/admin/admin-login.component';
import { CategoryManagementComponent } from './pages/admin/category-management.component';
import { StoreSettingsComponent } from './pages/admin/store-settings.component';

// Import auth guard
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

// Admin guard function
const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAdmin()) {
    return true;
  }
  
  return router.parseUrl('/admin/login');
};

const routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'best-offers', component: BestOffersComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'contact', component: ContactComponent },
  // Admin routes
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/products', component: ProductManagementComponent, canActivate: [adminGuard] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'admin/products/edit/:id', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'admin/categories', component: CategoryManagementComponent, canActivate: [adminGuard] },
  { path: 'admin/settings', component: StoreSettingsComponent, canActivate: [adminGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: '**', redirectTo: '' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
    }
  `]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});