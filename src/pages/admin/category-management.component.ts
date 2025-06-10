import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/product.interface';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="category-management fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Category Management</h1>
          <p>Add, edit, or remove product categories</p>
          <button (click)="showAddCategoryForm()" class="btn btn-primary">Add New Category</button>
        </div>
        
        <div class="category-form" *ngIf="showForm">
          <h3>{{ editMode ? 'Edit Category' : 'Add New Category' }}</h3>
          <form (ngSubmit)="saveCategory()" #categoryForm="ngForm">
            <div class="form-group">
              <label for="name">Category Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                [(ngModel)]="currentCategory.name" 
                required 
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="image">Image URL</label>
              <input 
                type="url" 
                id="image" 
                name="image" 
                [(ngModel)]="currentCategory.image" 
                required 
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="productCount">Product Count</label>
              <input 
                type="number" 
                id="productCount" 
                name="productCount" 
                [(ngModel)]="currentCategory.productCount" 
                required 
                min="0" 
                class="form-control"
              />
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="cancelEdit()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="!categoryForm.valid">
                {{ editMode ? 'Update Category' : 'Add Category' }}
              </button>
            </div>
          </form>
        </div>
        
        <div class="category-table-container">
          <table class="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Product Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let category of categories">
                <td>{{ category.id }}</td>
                <td>
                  <img [src]="category.image" [alt]="category.name" class="category-thumbnail" />
                </td>
                <td>{{ category.name }}</td>
                <td>{{ category.productCount }}</td>
                <td class="actions">
                  <button 
                    (click)="editCategory(category)" 
                    class="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    (click)="deleteCategory(category.id)" 
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
    .category-management {
      padding: 2rem 0;
    }
    
    .category-form {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 1.5rem;
      margin: 2rem 0;
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
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .category-table-container {
      overflow-x: auto;
      margin-top: 2rem;
    }
    
    .category-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .category-table th, .category-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    .category-table th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    
    .category-thumbnail {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
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
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  currentCategory: Category = {
    id: 0,
    name: '',
    image: '',
    productCount: 0
  };
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadCategories();
  }
  
  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  
  showAddCategoryForm(): void {
    this.editMode = false;
    this.currentCategory = {
      id: 0,
      name: '',
      image: '',
      productCount: 0
    };
    this.showForm = true;
  }
  
  editCategory(category: Category): void {
    this.editMode = true;
    this.currentCategory = { ...category };
    this.showForm = true;
  }
  
  saveCategory(): void {
    if (this.editMode) {
      this.productService.updateCategory(this.currentCategory);
    } else {
      this.productService.addCategory(this.currentCategory);
    }
    
    this.showForm = false;
    this.loadCategories();
  }
  
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.productService.deleteCategory(id);
      this.loadCategories();
    }
  }
  
  cancelEdit(): void {
    this.showForm = false;
  }
}