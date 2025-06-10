import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>🛒 SuperMart</h3>
            <p>Your one-stop destination for fresh groceries and supermarket items. Quality products, competitive prices, and excellent service.</p>
            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">🐦</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/categories">Categories</a></li>
              <li><a routerLink="/products">Products</a></li>
              <li><a routerLink="/best-offers">Best Offers</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a routerLink="/contact">Contact Us</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Returns & Refunds</a></li>
              <li><a href="#">Shipping Info</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Contact Info</h4>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ info&#64;supermart.com</p>
            <p>📍 123 Market Street, City, State 12345</p>
            <p>🕒 Mon-Sun: 7:00 AM - 10:00 PM</p>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 SuperMart. All rights reserved. | Made with ❤️ for fresh groceries</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2c3e50, #34495e);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: auto;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .footer-section h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #3498db;
    }
    
    .footer-section h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #ecf0f1;
    }
    
    .footer-section p {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
    
    .footer-section ul {
      list-style: none;
    }
    
    .footer-section ul li {
      margin-bottom: 0.5rem;
    }
    
    .footer-section ul li a {
      color: #bdc3c7;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-section ul li a:hover {
      color: #3498db;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .social-link {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      font-size: 1.2rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background: #3498db;
      transform: translateY(-3px);
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
      text-align: center;
      color: #bdc3c7;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .footer-section {
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}