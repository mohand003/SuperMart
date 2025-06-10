import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Category } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      description: 'Premium quality organic apples, fresh and crispy',
      price: 4.99,
      originalPrice: 6.99,
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Fruits',
      inStock: true,
      rating: 4.8,
      reviews: 124,
      isOffer: true,
      offerText: '30% OFF'
    },
    {
      id: 2,
      name: 'Whole Wheat Bread',
      description: 'Freshly baked whole wheat bread, perfect for breakfast',
      price: 2.99,
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Bakery',
      inStock: true,
      rating: 4.5,
      reviews: 89
    },
    {
      id: 3,
      name: 'Fresh Milk',
      description: 'Farm fresh milk, rich in nutrients and calcium',
      price: 3.49,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Dairy',
      inStock: true,
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: 'Organic Bananas',
      description: 'Sweet and ripe organic bananas, perfect for smoothies',
      price: 2.49,
      originalPrice: 3.49,
      image: 'https://images.pexels.com/photos/5639532/pexels-photo-5639532.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Fruits',
      inStock: true,
      rating: 4.6,
      reviews: 203,
      isOffer: true,
      offerText: 'FRESH DEAL'
    },
    {
      id: 5,
      name: 'Free Range Eggs',
      description: 'Farm fresh free-range eggs, packed with protein',
      price: 5.99,
      image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Dairy',
      inStock: true,
      rating: 4.9,
      reviews: 98
    },
    {
      id: 6,
      name: 'Fresh Spinach',
      description: 'Organic fresh spinach leaves, rich in iron and vitamins',
      price: 3.99,
      image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Vegetables',
      inStock: true,
      rating: 4.4,
      reviews: 67
    },
    {
      id: 7,
      name: 'Premium Salmon',
      description: 'Fresh Atlantic salmon, perfect for grilling',
      price: 12.99,
      originalPrice: 15.99,
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Seafood',
      inStock: true,
      rating: 4.8,
      reviews: 145,
      isOffer: true,
      offerText: 'LIMITED TIME'
    },
    {
      id: 8,
      name: 'Artisan Cheese',
      description: 'Aged cheddar cheese with rich flavor',
      price: 8.99,
      image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Dairy',
      inStock: true,
      rating: 4.7,
      reviews: 112
    }
  ];

  private categories: Category[] = [
    { id: 1, name: 'Fruits', image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 15 },
    { id: 2, name: 'Vegetables', image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 22 },
    { id: 3, name: 'Dairy', image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 18 },
    { id: 4, name: 'Bakery', image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 12 },
    { id: 5, name: 'Meat', image: 'https://media.istockphoto.com/id/469354734/photo/fresh-and-raw-meat-sirloin-medallions-steaks.jpg?s=612x612&w=0&k=20&c=OH-FtjIgFS2psxomUDTZ450Zc35VvyZCQP2w64cbl_4=', productCount: 25 },
    { id: 6, name: 'Seafood', image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 16 }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  private categoriesSubject = new BehaviorSubject<Category[]>(this.categories);

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }

  getBestOffers(): Product[] {
    return this.products.filter(product => product.isOffer);
  }

  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // New admin methods for product management
  addProduct(product: Omit<Product, 'id'>): Product {
    const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };
    
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);
    
    return newProduct;
  }

  updateProduct(updatedProduct: Product): Product | undefined {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next([...this.products]);
      return updatedProduct;
    }
    
    return undefined;
  }

  deleteProduct(id: number): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    
    if (initialLength !== this.products.length) {
      this.productsSubject.next([...this.products]);
      return true;
    }
    
    return false;
  }

  // Category management methods
  addCategory(category: Omit<Category, 'id'>): Category {
    const newId = Math.max(...this.categories.map(c => c.id), 0) + 1;
    const newCategory = { ...category, id: newId };
    
    this.categories.push(newCategory);
    this.categoriesSubject.next([...this.categories]);
    
    return newCategory;
  }

  updateCategory(updatedCategory: Category): Category | undefined {
    const index = this.categories.findIndex(c => c.id === updatedCategory.id);
    
    if (index !== -1) {
      this.categories[index] = updatedCategory;
      this.categoriesSubject.next([...this.categories]);
      return updatedCategory;
    }
    
    return undefined;
  }

  deleteCategory(id: number): boolean {
    const initialLength = this.categories.length;
    this.categories = this.categories.filter(category => category.id !== id);
    
    if (initialLength !== this.categories.length) {
      this.categoriesSubject.next([...this.categories]);
      return true;
    }
    
    return false;
  }
}