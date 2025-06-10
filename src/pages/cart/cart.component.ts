import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Shopping Cart</h1>
          <p>Review your items before proceeding to checkout</p>
        </div>

        <div class="cart-content" *ngIf="(cartItems$ | async)?.length! > 0; else emptyCart">
          <div class="cart-items">
            <div class="cart-item" *ngFor="let item of cartItems$ | async">
              <div class="item-image">
                <img [src]="item.product.image" [alt]="item.product.name" />
              </div>
              
              <div class="item-info">
                <h3>{{ item.product.name }}</h3>
                <p>{{ item.product.description }}</p>
                <div class="item-price">
                  <span class="current-price">\${{ item.product.price.toFixed(2) }}</span>
                  <span class="original-price" *ngIf="item.product.originalPrice">
                    \${{ item.product.originalPrice.toFixed(2) }}
                  </span>
                </div>
              </div>
              
              <div class="item-quantity">
                <button 
                  class="quantity-btn"
                  (click)="decreaseQuantity(item)">-</button>
                <span class="quantity">{{ item.quantity }}</span>
                <button 
                  class="quantity-btn"
                  (click)="increaseQuantity(item)">+</button>
              </div>
              
              <div class="item-total">
                <span class="total-price">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
              </div>
              
              <div class="item-actions">
                <button 
                  class="remove-btn"
                  (click)="removeItem(item)">🗑️</button>
              </div>
            </div>
          </div>

          <div class="cart-summary">
            <div class="summary-card">
              <h3>Order Summary</h3>
              
              <div class="summary-row">
                <span>Items ({{ getTotalItems() }}):</span>
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
              
              <div class="checkout-actions">
                <a routerLink="/payment" class="btn btn-primary checkout-btn">
                  Proceed to Checkout
                </a>
                <button class="btn btn-secondary" (click)="clearCart()">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <ng-template #emptyCart>
          <div class="empty-cart">
            <div class="empty-cart-content">
              <div class="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <a routerLink="/products" class="btn btn-primary">Start Shopping</a>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
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
    
    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }
    
    .cart-items {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .cart-item {
      display: grid;
      grid-template-columns: auto 1fr auto auto auto;
      gap: 1.5rem;
      align-items: center;
      padding: 1.5rem 0;
      border-bottom: 1px solid #e9ecef;
    }
    
    .cart-item:last-child {
      border-bottom: none;
    }
    
    .item-image img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }
    
    .item-info h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .item-info p {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .current-price {
      font-weight: 600;
      color: #27ae60;
    }
    
    .original-price {
      color: #95a5a6;
      text-decoration: line-through;
      margin-left: 0.5rem;
      font-size: 0.9rem;
    }
    
    .item-quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .quantity-btn {
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    
    .quantity-btn:hover {
      background: #3498db;
      color: white;
      border-color: #3498db;
    }
    
    .quantity {
      font-weight: 600;
      min-width: 30px;
      text-align: center;
    }
    
    .total-price {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .remove-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    
    .remove-btn:hover {
      background: #e74c3c;
      transform: scale(1.1);
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
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .summary-row.total {
      font-size: 1.2rem;
      font-weight: 700;
      color: #2c3e50;
      margin-top: 1rem;
    }
    
    .checkout-actions {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .checkout-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .empty-cart {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }
    
    .empty-cart-content {
      text-align: center;
      max-width: 400px;
    }
    
    .empty-cart-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .empty-cart-content h3 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .empty-cart-content p {
      color: #7f8c8d;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    
    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .cart-item {
        grid-template-columns: auto 1fr;
        gap: 1rem;
      }
      
      .item-quantity,
      .item-total,
      .item-actions {
        grid-column: 1 / -1;
        justify-self: start;
        margin-top: 1rem;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  ngOnInit(): void {}

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }
}