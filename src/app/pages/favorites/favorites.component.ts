import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, AsyncPipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  private productService = inject(ProductService);
  private favoritesService = inject(FavoritesService);

  favoriteProducts$!: Observable<Product[]>;

  ngOnInit(): void {
    this.favoriteProducts$ = combineLatest([
      this.productService.getCatalogProducts(),
      this.favoritesService.favorites$
    ]).pipe(
      map(([products, favIds]) =>
        products.filter(p => favIds.includes(p.id))
      )
    );
  }
}
