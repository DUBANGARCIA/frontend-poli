import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';
  sortBy = 'name-asc';

  ngOnInit(): void {
    this.productService.getCatalogProducts().subscribe((products) => {
      this.allProducts = products;
      this.categories = [...new Set(products.map((p) => p.category))].sort();
      this.applyFilters();
      this.cdr.markForCheck();
    });
  }

  applyFilters(): void {
    let result = [...this.allProducts];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      );
    }

    if (this.selectedCategory) {
      result = result.filter((p) => p.category === this.selectedCategory);
    }

    result.sort((a, b) => {
      switch (this.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    this.filteredProducts = result;
  }
}
