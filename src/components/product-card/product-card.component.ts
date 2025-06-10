import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.image" [alt]="product.name" />
        <div class="offer-badge" *ngIf="product.isOffer">
          {{ product.offerText }}
        </div>
      </div>
      
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        
        <div class="product-rating">
          <span class="stars">⭐⭐⭐⭐⭐</span>
          <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reviews)</span>
        </div>
        
        <div class="product-price">
          <span class="current-price">\${{ product.price.toFixed(2) }}</span>
          <span class="original-price" *ngIf="product.originalPrice">
            \${{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
        
        <div class="product-actions">
          <button 
            class="btn btn-primary add-to-cart-btn"
            (click)="addToCart()"
            [disabled]="!product.inStock">
            {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
    
    .product-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }
    
    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .product-card:hover .product-image img {
      transform: scale(1.05);
    }
    
    .offer-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .product-info {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .product-name {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #2c3e50;
      line-height: 1.3;
    }
    
    .product-description {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 12px;
      line-height: 1.4;
      flex: 1;
    }
    
    .product-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .stars {
      color: #f39c12;
      font-size: 0.9rem;
    }
    
    .rating-text {
      color: #7f8c8d;
      font-size: 0.8rem;
    }
    
    .product-price {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    
    .current-price {
      font-size: 1.3rem;
      font-weight: 700;
      color: #27ae60;
    }
    
    .original-price {
      font-size: 1rem;
      color: #95a5a6;
      text-decoration: line-through;
    }
    
    .add-to-cart-btn {
      width: 100%;
      padding: 12px;
      font-weight: 600;
    }
    
    .add-to-cart-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
      transform: none;
    }
    
    .add-to-cart-btn:disabled:hover {
      background: #bdc3c7;
      transform: none;
      box-shadow: none;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    if (this.product.inStock) {
      this.cartService.addToCart(this.product);
    }
  }
}