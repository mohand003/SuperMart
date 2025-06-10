import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  template: `
    <div class="products-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>{{ selectedCategory ? selectedCategory + ' Products' : 'All Products' }}</h1>
          <p>Discover our fresh selection of quality groceries and supermarket items</p>
        </div>

        <div class="filters-section">
          <div class="search-filter">
            <input 
              type="text" 
              class="form-input" 
              placeholder="Search products..." 
              [(ngModel)]="searchQuery"
              (input)="onSearch()">
          </div>
          
          <div class="category-filter">
            <select class="form-input" [(ngModel)]="selectedCategory" (change)="onCategoryChange()">
              <option value="">All Categories</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Meat">Meat</option>
              <option value="Seafood">Seafood</option>
            </select>
          </div>
          
          <div class="sort-filter">
            <select class="form-input" [(ngModel)]="sortBy" (change)="onSortChange()">
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div class="products-count">
          <p>Showing {{ filteredProducts.length }} products</p>
        </div>

        <div class="products-grid grid grid-4" *ngIf="filteredProducts.length > 0">
          <app-product-card 
            *ngFor="let product of filteredProducts" 
            [product]="product">
          </app-product-card>
        </div>

        <div class="no-products" *ngIf="filteredProducts.length === 0">
          <div class="no-products-content">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button class="btn btn-primary" (click)="clearFilters()">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-page {
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
    }
    
    .filters-section {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .products-count {
      margin-bottom: 2rem;
      color: #7f8c8d;
      font-weight: 500;
    }
    
    .no-products {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }
    
    .no-products-content {
      text-align: center;
      max-width: 400px;
    }
    
    .no-products-content h3 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .no-products-content p {
      color: #7f8c8d;
      margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
      .filters-section {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1.5rem;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  sortBy: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
    });

    // Check for category query parameter
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.onCategoryChange();
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchQuery.trim()) {
      filtered = this.productService.searchProducts(this.searchQuery);
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Apply sorting
    if (this.sortBy) {
      filtered = this.sortProducts(filtered, this.sortBy);
    }

    this.filteredProducts = filtered;
  }

  sortProducts(products: Product[], sortBy: string): Product[] {
    switch (sortBy) {
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.sortBy = '';
    this.filteredProducts = [...this.products];
  }
}