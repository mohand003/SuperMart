import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-best-offers',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="offers-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>🔥 Best Offers & Deals</h1>
          <p>Don't miss out on these amazing deals! Limited time offers on your favorite products.</p>
        </div>

        <div class="offers-banner">
          <div class="banner-content">
            <h2>Special Weekend Sale</h2>
            <p>Up to 50% off on selected items</p>
            <div class="countdown-timer">
              <div class="timer-item">
                <span class="timer-number">2</span>
                <span class="timer-label">Days</span>
              </div>
              <div class="timer-item">
                <span class="timer-number">14</span>
                <span class="timer-label">Hours</span>
              </div>
              <div class="timer-item">
                <span class="timer-number">30</span>
                <span class="timer-label">Minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div class="offers-grid grid grid-4" *ngIf="offerProducts.length > 0">
          <app-product-card 
            *ngFor="let product of offerProducts" 
            [product]="product">
          </app-product-card>
        </div>

        <div class="no-offers" *ngIf="offerProducts.length === 0">
          <div class="no-offers-content">
            <h3>No active offers right now</h3>
            <p>Check back soon for amazing deals and discounts!</p>
          </div>
        </div>

        <div class="deal-categories">
          <h2>Deal Categories</h2>
          <div class="categories-grid grid grid-3">
            <div class="deal-category">
              <div class="category-icon">🍎</div>
              <h3>Fresh Produce</h3>
              <p>Up to 30% off on fresh fruits and vegetables</p>
              <span class="discount-badge">30% OFF</span>
            </div>
            <div class="deal-category">
              <div class="category-icon">🥛</div>
              <h3>Dairy Products</h3>
              <p>Special prices on milk, cheese, and yogurt</p>
              <span class="discount-badge">25% OFF</span>
            </div>
            <div class="deal-category">
              <div class="category-icon">🍞</div>
              <h3>Bakery Items</h3>
              <p>Fresh bread and pastries at discounted prices</p>
              <span class="discount-badge">20% OFF</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .offers-page {
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
      color: #e74c3c;
      margin-bottom: 1rem;
    }
    
    .page-header p {
      font-size: 1.1rem;
      color: #7f8c8d;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .offers-banner {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
      border-radius: 20px;
      padding: 3rem 2rem;
      margin-bottom: 3rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .offers-banner::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
      animation: float 20s linear infinite;
    }
    
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      100% { transform: translate(-50px, -50px) rotate(360deg); }
    }
    
    .banner-content {
      position: relative;
      z-index: 1;
    }
    
    .banner-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .banner-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .countdown-timer {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
    
    .timer-item {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 1rem;
      min-width: 80px;
      text-align: center;
    }
    
    .timer-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
    }
    
    .timer-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    .no-offers {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      margin: 3rem 0;
    }
    
    .no-offers-content {
      text-align: center;
      max-width: 400px;
    }
    
    .no-offers-content h3 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .no-offers-content p {
      color: #7f8c8d;
    }
    
    .deal-categories {
      margin-top: 4rem;
    }
    
    .deal-categories h2 {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 2rem;
      color: #2c3e50;
    }
    
    .deal-category {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .deal-category:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
    
    .category-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .deal-category h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .deal-category p {
      color: #7f8c8d;
      margin-bottom: 1.5rem;
    }
    
    .discount-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 2rem;
      }
      
      .banner-content h2 {
        font-size: 2rem;
      }
      
      .countdown-timer {
        gap: 1rem;
      }
      
      .timer-item {
        min-width: 60px;
        padding: 0.8rem;
      }
      
      .timer-number {
        font-size: 1.5rem;
      }
    }
  `]
})
export class BestOffersComponent implements OnInit {
  offerProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.offerProducts = this.productService.getBestOffers();
  }
}