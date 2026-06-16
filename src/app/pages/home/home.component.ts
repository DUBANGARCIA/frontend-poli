import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { TestimonialsService } from '../../services/testimonials.service';
import { Product } from '../../models/product.model';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private testimonialsService = inject(TestimonialsService);

  featuredProducts$!: Observable<Product[]>;
  testimonials$!: Observable<Testimonial[]>;

  ngOnInit(): void {
    this.featuredProducts$ = this.productService.getFeaturedProducts();
    this.testimonials$ = this.testimonialsService.getTestimonials();
  }
}
