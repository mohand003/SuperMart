import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="store-settings fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Store Settings</h1>
          <p>Configure your store settings and preferences</p>
        </div>
        
        <div class="settings-container">
          <form (ngSubmit)="saveSettings()" #settingsForm="ngForm">
            <div class="settings-section">
              <h3>General Settings</h3>
              
              <div class="form-group">
                <label for="storeName">Store Name</label>
                <input 
                  type="text" 
                  id="storeName" 
                  name="storeName" 
                  [(ngModel)]="settings.storeName" 
                  required 
                  class="form-control"
                />
              </div>
              
              <div class="form-group">
                <label for="storeDescription">Store Description</label>
                <textarea 
                  id="storeDescription" 
                  name="storeDescription" 
                  [(ngModel)]="settings.storeDescription" 
                  rows="3" 
                  class="form-control"
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="contactEmail">Contact Email</label>
                <input 
                  type="email" 
                  id="contactEmail" 
                  name="contactEmail" 
                  [(ngModel)]="settings.contactEmail" 
                  required 
                  class="form-control"
                />
              </div>
              
              <div class="form-group">
                <label for="contactPhone">Contact Phone</label>
                <input 
                  type="tel" 
                  id="contactPhone" 
                  name="contactPhone" 
                  [(ngModel)]="settings.contactPhone" 
                  class="form-control"
                />
              </div>
            </div>
            
            <div class="settings-section">
              <h3>Display Settings</h3>
              
              <div class="form-group">
                <label for="currency">Currency Symbol</label>
                <input 
                  type="text" 
                  id="currency" 
                  name="currency" 
                  [(ngModel)]="settings.currency" 
                  required 
                  class="form-control"
                />
              </div>
              
              <div class="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="showOutOfStock" 
                    [(ngModel)]="settings.showOutOfStock" 
                  />
                  Show Out of Stock Products
                </label>
              </div>
              
              <div class="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="enableReviews" 
                    [(ngModel)]="settings.enableReviews" 
                  />
                  Enable Product Reviews
                </label>
              </div>
              
              <div class="form-group">
                <label for="productsPerPage">Products Per Page</label>
                <input 
                  type="number" 
                  id="productsPerPage" 
                  name="productsPerPage" 
                  [(ngModel)]="settings.productsPerPage" 
                  required 
                  min="1" 
                  class="form-control"
                />
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary" [disabled]="!settingsForm.valid">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .store-settings {
      padding: 2rem 0;
    }
    
    .settings-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 2rem;
      margin-top: 2rem;
    }
    
    .settings-section {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    
    .settings-section h3 {
      margin-bottom: 1.5rem;
      color: #2c3e50;
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
    
    textarea.form-control {
      resize: vertical;
    }
    
    .checkbox-group {
      display: flex;
      align-items: center;
    }
    
    .checkbox-group input {
      margin-right: 0.5rem;
    }
    
    .form-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class StoreSettingsComponent {
  settings = {
    storeName: 'SuperMart',
    storeDescription: 'Your one-stop shop for fresh groceries and household items',
    contactEmail: 'contact@supermart.com',
    contactPhone: '+1 (555) 123-4567',
    currency: '$',
    showOutOfStock: true,
    enableReviews: true,
    productsPerPage: 12
  };
  
  saveSettings(): void {
    // In a real application, this would save to a backend service
    alert('Settings saved successfully!');
    console.log('Settings saved:', this.settings);
  }
}