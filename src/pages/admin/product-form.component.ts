import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="product-form-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h1>
          <p>{{ isEditMode ? 'Update product information' : 'Create a new product listing' }}</p>
        </div>
        
        <div class="form-container">
          <form (ngSubmit)="onSubmit()" #productForm="ngForm">
            <div class="form-group">
              <label for="name">Product Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                [(ngModel)]="product.name" 
                required 
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="description">Description</label>
              <textarea 
                id="description" 
                name="description" 
                [(ngModel)]="product.description" 
                required 
                class="form-control"
                rows="4"
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="price">Price ($)</label>
                <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  [(ngModel)]="product.price" 
                  required 
                  min="0" 
                  step="0.01" 
                  class="form-control"
                />
              </div>
              
              <div class="form-group">
                <label for="originalPrice">Original Price ($) (Optional)</label>
                <input 
                  type="number" 
                  id="originalPrice" 
                  name="originalPrice" 
                  [(ngModel)]="product.originalPrice" 
                  min="0" 
                  step="0.01" 
                  class="form-control"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="image">Image URL</label>
              <input 
                type="url" 
                id="image" 
                name="image" 
                [(ngModel)]="product.image" 
                required 
                class="form-control"
              />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="category">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  [(ngModel)]="product.category" 
                  required 
                  class="form-control"
                >
                  <option *ngFor="let category of categories" [value]="category.name">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="inStock">Stock Status</label>
                <select 
                  id="inStock" 
                  name="inStock" 
                  [(ngModel)]="product.inStock" 
                  required 
                  class="form-control"
                >
                  <option [ngValue]="true">In Stock</option>
                  <option [ngValue]="false">Out of Stock</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="rating">Rating (1-5)</label>
                <input 
                  type="number" 
                  id="rating" 
                  name="rating" 
                  [(ngModel)]="product.rating" 
                  required 
                  min="1" 
                  max="5" 
                  step="0.1" 
                  class="form-control"
                />
              </div>
              
              <div class="form-group">
                <label for="reviews">Number of Reviews</label>
                <input 
                  type="number" 
                  id="reviews" 
                  name="reviews" 
                  [(ngModel)]="product.reviews" 
                  required 
                  min="0" 
                  class="form-control"
                />
              </div>
            </div>
            
            <div class="form-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="isOffer" 
                  [(ngModel)]="product.isOffer" 
                />
                Mark as Special Offer
              </label>
            </div>
            
            <div class="form-group" *ngIf="product.isOffer">
              <label for="offerText">Offer Text</label>
              <input 
                type="text" 
                id="offerText" 
                name="offerText" 
                [(ngModel)]="product.offerText" 
                class="form-control"
              />
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="goBack()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="!productForm.valid">
                {{ isEditMode ? 'Update Product' : 'Add Product' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-form-page {
      padding: 2rem 0;
    }
    
    .form-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 2rem;
      margin-top: 2rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    inStock: true,
    rating: 4.0,
    reviews: 0,
    isOffer: false
  };
  
  categories: Category[] = [];
  isEditMode: boolean = false;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadCategories();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const productId = parseInt(id, 10);
      const existingProduct = this.productService.getProductById(productId);
      
      if (existingProduct) {
        this.product = { ...existingProduct };
      } else {
        this.router.navigate(['/admin/products']);
      }
    }
  }
  
  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  
  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product);
    } else {
      const { id, ...productWithoutId } = this.product;
      this.productService.addProduct(productWithoutId);
    }
    
    this.router.navigate(['/admin/products']);
  }
  
  goBack(): void {
    this.router.navigate(['/admin/products']);
  }
}