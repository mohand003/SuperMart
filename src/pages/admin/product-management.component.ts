import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="product-management fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Product Management</h1>
          <p>Add, edit, or remove products from your inventory</p>
          <a routerLink="/admin/products/new" class="btn btn-primary">Add New Product</a>
        </div>
        
        <div class="search-bar">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="onSearch()" 
            placeholder="Search products..." 
            class="search-input"
          />
        </div>
        
        <div class="product-table-container">
          <table class="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of filteredProducts">
                <td>{{ product.id }}</td>
                <td>
                  <img [src]="product.image" [alt]="product.name" class="product-thumbnail" />
                </td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>$ {{ product.price.toFixed(2) }}</td>
                <td>
                  <span [class.in-stock]="product.inStock" [class.out-of-stock]="!product.inStock">
                    {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                  </span>
                </td>
                <td class="actions">
                  <button 
                    [routerLink]="['/admin/products/edit', product.id]" 
                    class="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    (click)="deleteProduct(product.id)" 
                    class="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-management {
      padding: 2rem 0;
    }
    
    .search-bar {
      margin: 2rem 0;
    }
    
    .search-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .product-table-container {
      overflow-x: auto;
    }
    
    .product-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    
    .product-table th, .product-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    .product-table th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    
    .product-thumbnail {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .in-stock {
      color: #28a745;
      font-weight: 500;
    }
    
    .out-of-stock {
      color: #dc3545;
      font-weight: 500;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
  `]
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }
  
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      const searchTerm = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }
  }
  
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
      this.loadProducts();
    }
  }
}