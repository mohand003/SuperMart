import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <div class="home-page fade-in">
      <!-- Hero Section -->
      <section class="hero">
        <div class="animated-background">
          <div class="bubble bubble-1"></div>
          <div class="bubble bubble-2"></div>
          <div class="bubble bubble-3"></div>
          <div class="bubble bubble-4"></div>
          <div class="bubble bubble-5"></div>
          <div class="bubble bubble-6"></div>
        </div>
        <div class="container">
          <div class="hero-content">
            <h1>Fresh Groceries Delivered to Your Door</h1>
            <p>Discover the finest selection of fresh produce, dairy, meat, and pantry essentials. Quality guaranteed, prices you'll love.</p>
            <div class="hero-actions">
              <a routerLink="/products" class="btn btn-primary">Shop Now</a>
              <a routerLink="/best-offers" class="btn btn-outline">View Offers</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fresh Groceries" />
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">Shop by Category</h2>
          <div class="categories-grid grid grid-3">
            <div class="category-card" *ngFor="let category of categories">
              <div class="category-image">
                <img [src]="category.image" [alt]="category.name" />
              </div>
              <div class="category-info">
                <h3>{{ category.name }}</h3>
                <p>{{ category.productCount }} products</p>
                <a routerLink="/categories" class="btn btn-secondary">Explore</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="featured-section">
        <div class="container">
          <h2 class="section-title">Featured Products</h2>
          <div class="products-grid grid grid-4">
            <app-product-card 
              *ngFor="let product of featuredProducts" 
              [product]="product">
            </app-product-card>
          </div>
          <div class="text-center mt-4">
            <a routerLink="/products" class="btn btn-primary">View All Products</a>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Why Choose SuperMart?</h2>
          <div class="features-grid grid grid-3">
            <div class="feature-card">
              <div class="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Same-day delivery available. Get your groceries when you need them.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌱</div>
              <h3>Fresh Quality</h3>
              <p>Hand-picked fresh produce and quality products you can trust.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices with regular deals and special offers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      position: relative;
      color: white;
      padding: 4rem 0;
      min-height: 600px;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600');
      background-size: cover;
      background-position: center;
      filter: blur(8px) brightness(60%);
      z-index: -1;
    }
    
    .animated-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    
    .bubble {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      animation: float 8s infinite ease-in-out;
    }
    
    .bubble-1 {
      width: 80px;
      height: 80px;
      left: 10%;
      top: 20%;
      animation-delay: 0s;
    }
    
    .bubble-2 {
      width: 120px;
      height: 120px;
      right: 15%;
      top: 40%;
      animation-delay: 1s;
    }
    
    .bubble-3 {
      width: 60px;
      height: 60px;
      left: 30%;
      bottom: 30%;
      animation-delay: 2s;
    }
    
    .bubble-4 {
      width: 100px;
      height: 100px;
      right: 30%;
      bottom: 20%;
      animation-delay: 3s;
    }
    
    .bubble-5 {
      width: 70px;
      height: 70px;
      left: 60%;
      top: 15%;
      animation-delay: 4s;
    }
    
    .bubble-6 {
      width: 90px;
      height: 90px;
      left: 5%;
      bottom: 10%;
      animation-delay: 5s;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0.5;
      }
      25% {
        transform: translateY(-20px) translateX(10px);
        opacity: 0.8;
      }
      50% {
        transform: translateY(0) translateX(20px);
        opacity: 0.6;
      }
      75% {
        transform: translateY(20px) translateX(10px);
        opacity: 0.8;
      }
      100% {
        transform: translateY(0) translateX(0);
        opacity: 0.5;
      }
    }
    
    .hero .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    .hero-content h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
    }
    
    .hero-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      transition: transform 0.8s ease;
      transform-style: preserve-3d;
    }
    
    .hero-image:hover img {
      transform: scale(115%);
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
      color: #2c3e50;
    }
    
    .categories-section,
    .featured-section,
    .features-section {
      padding: 4rem 0;
    }
    
    .categories-section {
      background: #f8f9fa;
    }
    
    .category-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      text-align: center;
    }
    
    .category-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }
    
    .category-image {
      height: 200px;
      overflow: hidden;
    }
    
    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .category-card:hover .category-image img {
      transform: scale(1.1);
    }
    
    .category-info {
      padding: 1.5rem;
    }
    
    .category-info h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }
    
    .category-info p {
      color: #7f8c8d;
      margin-bottom: 1rem;
    }
    
    .features-section {
      background: #f8f9fa;
    }
    
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    
    .feature-card p {
      color: #7f8c8d;
      line-height: 1.6;
    }
    
    @media (max-width: 768px) {
      .hero .container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .hero-actions {
        justify-content: center;
      }
      
      .section-title {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories.slice(0, 6);
    });

    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
    });
  }
}