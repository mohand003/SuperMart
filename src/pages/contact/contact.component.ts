import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-page fade-in">
      <div class="container">
        <div class="page-header">
          <h1>Contact Us</h1>
          <p>We're here to help! Get in touch with our customer service team</p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions about our products or need help with your order? We're here to assist you!</p>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">📞</div>
                <div class="method-info">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                  <span>Mon-Sun: 7:00 AM - 10:00 PM</span>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">✉️</div>
                <div class="method-info">
                  <h4>Email</h4>
                  <p>support&#64;supermart.com</p>
                  <span>Response within 24 hours</span>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">💬</div>
                <div class="method-info">
                  <h4>Live Chat</h4>
                  <p>Available 24/7</p>
                  <span>Instant support</span>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">📍</div>
                <div class="method-info">
                  <h4>Store Location</h4>
                  <p>123 Market Street</p>
                  <span>City, State 12345</span>
                </div>
              </div>
            </div>

            <div class="store-hours">
              <h3>Store Hours</h3>
              <div class="hours-list">
                <div class="hours-item">
                  <span>Monday - Friday:</span>
                  <span>7:00 AM - 10:00 PM</span>
                </div>
                <div class="hours-item">
                  <span>Saturday:</span>
                  <span>8:00 AM - 11:00 PM</span>
                </div>
                <div class="hours-item">
                  <span>Sunday:</span>
                  <span>8:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-section">
            <div class="form-card">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              <form class="contact-form" (ngSubmit)="submitForm()">
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-input" [(ngModel)]="contactForm.firstName" name="firstName" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-input" [(ngModel)]="contactForm.lastName" name="lastName" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-input" [(ngModel)]="contactForm.email" name="email" required>
                </div>

                <div class="form-group">
                  <label class="form-label">Phone Number (Optional)</label>
                  <input type="tel" class="form-input" [(ngModel)]="contactForm.phone" name="phone">
                </div>

                <div class="form-group">
                  <label class="form-label">Subject</label>
                  <select class="form-input" [(ngModel)]="contactForm.subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Message</label>
                  <textarea 
                    class="form-input message-textarea" 
                    [(ngModel)]="contactForm.message" 
                    name="message" 
                    rows="6" 
                    placeholder="Please describe your inquiry in detail..."
                    required>
                  </textarea>
                </div>

                <button type="submit" class="btn btn-primary submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h4>What are your delivery hours?</h4>
              <p>We deliver from 8:00 AM to 8:00 PM, Monday through Sunday. Same-day delivery is available for orders placed before 3:00 PM.</p>
            </div>
            <div class="faq-item">
              <h4>Do you offer organic products?</h4>
              <p>Yes! We have a wide selection of certified organic fruits, vegetables, dairy products, and pantry items.</p>
            </div>
            <div class="faq-item">
              <h4>What's your return policy?</h4>
              <p>We guarantee fresh quality. If you're not satisfied with any product, contact us within 24 hours for a full refund or replacement.</p>
            </div>
            <div class="faq-item">
              <h4>Do you have a mobile app?</h4>
              <p>Our mobile-optimized website works great on all devices. A dedicated mobile app is coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
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
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }
    
    .contact-info h2 {
      font-size: 2rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .contact-info > p {
      color: #7f8c8d;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    
    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .contact-method {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
    
    .contact-method:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }
    
    .method-icon {
      font-size: 2rem;
      min-width: 50px;
    }
    
    .method-info h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .method-info p {
      color: #3498db;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .method-info span {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .store-hours {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .store-hours h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .hours-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .hours-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .hours-item span:first-child {
      font-weight: 500;
      color: #2c3e50;
    }
    
    .hours-item span:last-child {
      color: #27ae60;
      font-weight: 600;
    }
    
    .form-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .form-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .form-card > p {
      color: #7f8c8d;
      margin-bottom: 2rem;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .message-textarea {
      resize: vertical;
      min-height: 120px;
    }
    
    .submit-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 1rem;
    }
    
    .faq-section {
      margin-top: 4rem;
    }
    
    .faq-section h2 {
      font-size: 2rem;
      font-weight: 600;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .faq-item {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
    
    .faq-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }
    
    .faq-item h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .faq-item p {
      color: #7f8c8d;
      line-height: 1.6;
    }
    
    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
      
      .faq-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  submitForm(): void {
    // Simulate form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    
    // Reset form
    this.contactForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}