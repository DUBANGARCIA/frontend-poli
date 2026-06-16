import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDetail } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  product: ProductDetail | null = null;
  selectedSize: string | null = null;
  isFavorite$!: Observable<boolean>;

  ngOnInit(): void {
    this.productService.getProductDetail().subscribe((product) => {
      this.product = product;
      this.isFavorite$ = this.favoritesService.favorites$.pipe(
        map((favIds) => favIds.includes(product.id)),
      );
      this.cdr.markForCheck();
    });
  }

  selectSize(size: string): void {
    this.selectedSize = size;
    this.cdr.markForCheck();
  }

  toggleFavorite(): void {
    if (this.product) {
      this.favoritesService.toggle(this.product.id);
    }
  }
}
