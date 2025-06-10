import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>My Profile</h1>
          <p>Manage your account information and preferences</p>
        </div>

        <div class="profile-content">
          <div class="profile-sidebar">
            <div class="profile-avatar">
              <div class="avatar-circle">
                <span class="avatar-text">{{ getInitials() }}</span>
              </div>
              <h3>{{ userInfo.firstName }} {{ userInfo.lastName }}</h3>
              <p>{{ userInfo.email }}</p>
            </div>

            <div class="profile-menu">
              <div class="menu-item" 
                   [class.active]="activeTab === 'personal'"
                   (click)="activeTab = 'personal'">
                <span class="menu-icon">👤</span>
                Personal Information
              </div>
              <div class="menu-item" 
                   [class.active]="activeTab === 'orders'"
                   (click)="activeTab = 'orders'">
                <span class="menu-icon">📦</span>
                Order History
              </div>
              <div class="menu-item" 
                   [class.active]="activeTab === 'addresses'"
                   (click)="activeTab = 'addresses'">
                <span class="menu-icon">📍</span>
                Saved Addresses
              </div>
              <div class="menu-item" 
                   [class.active]="activeTab === 'preferences'"
                   (click)="activeTab = 'preferences'">
                <span class="menu-icon">⚙️</span>
                Preferences
              </div>
            </div>
          </div>

          <div class="profile-main">
            <!-- Personal Information Tab -->
            <div class="tab-content" *ngIf="activeTab === 'personal'">
              <div class="content-header">
                <h2>Personal Information</h2>
                <p>Update your personal details and contact information</p>
              </div>

              <form class="profile-form">
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-input" [(ngModel)]="userInfo.firstName" name="firstName">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-input" [(ngModel)]="userInfo.lastName" name="lastName">
                  </div>
                  <div class="form-group full-width">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" [(ngModel)]="userInfo.email" name="email">
                  </div>
                  <div class="form-group full-width">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-input" [(ngModel)]="userInfo.phone" name="phone">
                  </div>
                  <div class="form-group full-width">
                    <label class="form-label">Date of Birth</label>
                    <input type="date" class="form-input" [(ngModel)]="userInfo.dateOfBirth" name="dateOfBirth">
                  </div>
                </div>
                <button type="button" class="btn btn-primary" (click)="saveProfile()">
                  Save Changes
                </button>
              </form>
            </div>

            <!-- Order History Tab -->
            <div class="tab-content" *ngIf="activeTab === 'orders'">
              <div class="content-header">
                <h2>Order History</h2>
                <p>View your past orders and track current deliveries</p>
              </div>

              <div class="orders-list">
                <div class="order-card" *ngFor="let order of orderHistory">
                  <div class="order-header">
                    <div class="order-info">
                      <h4>Order #{{ order.id }}</h4>
                      <span class="order-date">{{ order.date }}</span>
                    </div>
                    <span class="order-status" [class]="order.status.toLowerCase()">
                      {{ order.status }}
                    </span>
                  </div>
                  <div class="order-items">
                    <span>{{ order.itemCount }} items</span>
                    <span class="order-total">\${{ order.total.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Saved Addresses Tab -->
            <div class="tab-content" *ngIf="activeTab === 'addresses'">
              <div class="content-header">
                <h2>Saved Addresses</h2>
                <p>Manage your delivery addresses for quick checkout</p>
              </div>

              <div class="addresses-list">
                <div class="address-card" *ngFor="let address of savedAddresses">
                  <div class="address-info">
                    <h4>{{ address.label }}</h4>
                    <p>{{ address.street }}</p>
                    <p>{{ address.city }}, {{ address.zipCode }}</p>
                  </div>
                  <div class="address-actions">
                    <button class="btn btn-secondary btn-sm">Edit</button>
                    <button class="btn btn-outline btn-sm">Delete</button>
                  </div>
                </div>
                <div class="add-address-card">
                  <button class="btn btn-primary">+ Add New Address</button>
                </div>
              </div>
            </div>

            <!-- Preferences Tab -->
            <div class="tab-content" *ngIf="activeTab === 'preferences'">
              <div class="content-header">
                <h2>Preferences</h2>
                <p>Customize your shopping experience</p>
              </div>

              <div class="preferences-form">
                <div class="preference-group">
                  <h4>Notifications</h4>
                  <div class="preference-item">
                    <label class="preference-label">
                      <input type="checkbox" [(ngModel)]="preferences.emailNotifications">
                      Email notifications for orders and offers
                    </label>
                  </div>
                  <div class="preference-item">
                    <label class="preference-label">
                      <input type="checkbox" [(ngModel)]="preferences.smsNotifications">
                      SMS notifications for delivery updates
                    </label>
                  </div>
                </div>

                <div class="preference-group">
                  <h4>Shopping Preferences</h4>
                  <div class="preference-item">
                    <label class="preference-label">
                      <input type="checkbox" [(ngModel)]="preferences.organicOnly">
                      Show organic products only
                    </label>
                  </div>
                  <div class="preference-item">
                    <label class="preference-label">
                      <input type="checkbox" [(ngModel)]="preferences.localProducts">
                      Prefer local products
                    </label>
                  </div>
                </div>

                <button type="button" class="btn btn-primary" (click)="savePreferences()">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page {
      padding: 2rem 0;
      min-height: 80vh;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .page-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .page-header p {
      font-size: 1.1rem;
      color: #7f8c8d;
    }
    
    .profile-content {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 3rem;
    }
    
    .profile-sidebar {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      height: fit-content;
      position: sticky;
      top: 2rem;
    }
    
    .profile-avatar {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .avatar-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3498db, #2980b9);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    
    .avatar-text {
      font-size: 2rem;
      font-weight: 700;
      color: white;
    }
    
    .profile-avatar h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .profile-avatar p {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .profile-menu {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .menu-item:hover,
    .menu-item.active {
      background: #f8f9fa;
      color: #3498db;
    }
    
    .menu-icon {
      font-size: 1.2rem;
    }
    
    .profile-main {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .content-header {
      margin-bottom: 2rem;
    }
    
    .content-header h2 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .content-header p {
      color: #7f8c8d;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .form-group.full-width {
      grid-column: 1 / -1;
    }
    
    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .order-card {
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    
    .order-card:hover {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .order-info h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }
    
    .order-date {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .order-status {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .order-status.delivered {
      background: #d4edda;
      color: #155724;
    }
    
    .order-status.processing {
      background: #fff3cd;
      color: #856404;
    }
    
    .order-status.shipped {
      background: #cce7ff;
      color: #004085;
    }
    
    .order-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #7f8c8d;
    }
    
    .order-total {
      font-weight: 600;
      color: #27ae60;
      font-size: 1.1rem;
    }
    
    .addresses-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .address-card {
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .address-info h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .address-info p {
      color: #7f8c8d;
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
    
    .address-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
    
    .add-address-card {
      border: 2px dashed #e9ecef;
      border-radius: 8px;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .preferences-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .preference-group h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .preference-item {
      margin-bottom: 1rem;
    }
    
    .preference-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      font-weight: 500;
    }
    
    .preference-label input[type="checkbox"] {
      width: 18px;
      height: 18px;
    }
    
    @media (max-width: 768px) {
      .profile-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
      
      .addresses-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProfileComponent {
  activeTab: string = 'personal';

  userInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15'
  };

  orderHistory = [
    { id: '12345', date: 'March 15, 2025', status: 'Delivered', itemCount: 5, total: 67.89 },
    { id: '12344', date: 'March 10, 2025', status: 'Processing', itemCount: 3, total: 34.56 },
    { id: '12343', date: 'March 5, 2025', status: 'Shipped', itemCount: 8, total: 89.12 }
  ];

  savedAddresses = [
    { label: 'Home', street: '123 Main Street', city: 'New York', zipCode: '10001' },
    { label: 'Work', street: '456 Business Ave', city: 'New York', zipCode: '10002' }
  ];

  preferences = {
    emailNotifications: true,
    smsNotifications: false,
    organicOnly: false,
    localProducts: true
  };

  getInitials(): string {
    return `${this.userInfo.firstName.charAt(0)}${this.userInfo.lastName.charAt(0)}`;
  }

  saveProfile(): void {
    alert('Profile updated successfully!');
  }

  savePreferences(): void {
    alert('Preferences saved successfully!');
  }
}