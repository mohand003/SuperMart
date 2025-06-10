import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payment-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Checkout</h1>
          <p>Complete your order by providing payment and shipping details</p>
        </div>

        <div class="checkout-content">
          <div class="checkout-form">
            <div class="form-section">
              <h3>Shipping Information</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-input" [(ngModel)]="shippingInfo.firstName" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-input" [(ngModel)]="shippingInfo.lastName" required>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-input" [(ngModel)]="shippingInfo.email" required>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-input" [(ngModel)]="shippingInfo.phone" required>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-input" [(ngModel)]="shippingInfo.address" required>
                </div>
                <div class="form-group">
                  <label class="form-label">City</label>
                  <input type="text" class="form-input" [(ngModel)]="shippingInfo.city" required>
                </div>
                <div class="form-group">
                  <label class="form-label">ZIP Code</label>
                  <input type="text" class="form-input" [(ngModel)]="shippingInfo.zipCode" required>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Payment Information</h3>
              <div class="payment-methods">
                <div class="payment-method" 
                     [class.active]="paymentMethod === 'card'"
                     (click)="paymentMethod = 'card'">
                  <span class="payment-icon">💳</span>
                  <span>Credit/Debit Card</span>
                </div>
                <div class="payment-method" 
                     [class.active]="paymentMethod === 'paypal'"
                     (click)="paymentMethod = 'paypal'">
                  <span class="payment-icon">📱</span>
                  <span>PayPal</span>
                </div>
                <div class="payment-method" 
                     [class.active]="paymentMethod === 'cash'"
                     (click)="paymentMethod = 'cash'">
                  <span class="payment-icon">💵</span>
                  <span>Cash on Delivery</span>
                </div>
              </div>

              <div class="card-details" *ngIf="paymentMethod === 'card'">
                <div class="form-group">
                  <label class="form-label">Card Number</label>
                  <input type="text" class="form-input" placeholder="1234 5678 9012 3456" [(ngModel)]="cardInfo.number">
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Expiry Date</label>
                    <input type="text" class="form-input" placeholder="MM/YY" [(ngModel)]="cardInfo.expiry">
                  </div>
                  <div class="form-group">
                    <label class="form-label">CVV</label>
                    <input type="text" class="form-input" placeholder="123" [(ngModel)]="cardInfo.cvv">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Cardholder Name</label>
                  <input type="text" class="form-input" [(ngModel)]="cardInfo.name">
                </div>
              </div>
            </div>
          </div>

          <div class="order-summary">
            <div class="summary-card">
              <h3>Order Summary</h3>
              
              <div class="order-items" *ngIf="cartItems$ | async as items">
                <div class="order-item" *ngFor="let item of items">
                  <img [src]="item.product.image" [alt]="item.product.name" />
                  <div class="item-details">
                    <h4>{{ item.product.name }}</h4>
                    <span>Qty: {{ item.quantity }}</span>
                  </div>
                  <span class="item-price">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
              
              <div class="summary-calculations">
                <div class="summary-row">
                  <span>Subtotal:</span>
                  <span>\${{ getTotalPrice().toFixed(2) }}</span>
                </div>
                <div class="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div class="summary-row">
                  <span>Tax:</span>
                  <span>\${{ (getTotalPrice() * 0.08).toFixed(2) }}</span>
                </div>
                <hr>
                <div class="summary-row total">
                  <span>Total:</span>
                  <span>\${{ (getTotalPrice() * 1.08).toFixed(2) }}</span>
                </div>
              </div>
              
              <button class="btn btn-primary place-order-btn" (click)="placeOrder()">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-page {
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
    
    .checkout-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }
    
    .form-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .form-section h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .form-group.full-width {
      grid-column: 1 / -1;
    }
    
    .payment-methods {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .payment-method {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }
    
    .payment-method:hover,
    .payment-method.active {
      border-color: #3498db;
      background: #f8f9fa;
    }
    
    .payment-icon {
      font-size: 1.5rem;
    }
    
    .card-details {
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
    }
    
    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 2rem;
    }
    
    .summary-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }
    
    .order-items {
      margin-bottom: 1.5rem;
    }
    
    .order-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #e9ecef;
    }
    
    .order-item:last-child {
      border-bottom: none;
    }
    
    .order-item img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 8px;
    }
    
    .item-details {
      flex: 1;
    }
    
    .item-details h4 {
      font-size: 0.9rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }
    
    .item-details span {
      font-size: 0.8rem;
      color: #7f8c8d;
    }
    
    .item-price {
      font-weight: 600;
      color: #27ae60;
    }
    
    .summary-calculations {
      border-top: 1px solid #e9ecef;
      padding-top: 1rem;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    
    .summary-row.total {
      font-size: 1.2rem;
      font-weight: 700;
      color: #2c3e50;
      margin-top: 1rem;
    }
    
    .place-order-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .checkout-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .payment-methods {
        grid-template-columns: 1fr;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class PaymentComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  paymentMethod: string = 'card';

  shippingInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  };

  cardInfo = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  ngOnInit(): void {}

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  placeOrder(): void {
    // Simulate order processing
    alert('Order placed successfully! Thank you for shopping with SuperMart.');
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}