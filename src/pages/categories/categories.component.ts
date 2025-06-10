import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/product.interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="categories-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Product Categories</h1>
          <p>Explore our wide range of fresh groceries and supermarket items organized by categories</p>
        </div>

        <div class="categories-grid grid grid-3">
          <div class="category-card" *ngFor="let category of categories">
            <div class="category-image">
              <img [src]="category.image" [alt]="category.name" />
              <div class="category-overlay">
                <h3>{{ category.name }}</h3>
                <p>{{ category.productCount }} Products</p>
                <a routerLink="/products" [queryParams]="{category: category.name}" class="btn btn-primary">
                  Explore {{ category.name }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="category-stats">
          <div class="stat-card">
            <h3>{{ getTotalProducts() }}</h3>
            <p>Total Products</p>
          </div>
          <div class="stat-card">
            <h3>{{ categories.length }}</h3>
            <p>Categories</p>
          </div>
          <div class="stat-card">
            <h3>24/7</h3>
            <p>Online Shopping</p>
          </div>
          <div class="stat-card">
            <h3>Fresh</h3>
            <p>Daily Delivery</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categories-page {
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
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .category-card {
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      height: 300px;
    }
    
    .category-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    }
    
    .category-image {
      position: relative;
      width: 100%;
      height: 100%;
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
    
    .category-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .category-card:hover .category-overlay {
      opacity: 1;
    }
    
    .category-overlay h3 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .category-overlay p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      opacity: 0.9;
    }
    
    .category-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 4rem;
      padding: 2rem 0;
    }
    
    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
    
    .stat-card h3 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #3498db;
      margin-bottom: 0.5rem;
    }
    
    .stat-card p {
      color: #7f8c8d;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 2rem;
      }
      
      .category-overlay {
        opacity: 1;
        background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8));
      }
      
      .category-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getTotalProducts(): number {
    return this.categories.reduce((total, category) => total + category.productCount, 0);
  }
}