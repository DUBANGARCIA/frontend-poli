import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  private favoritesService = inject(FavoritesService);

  @Input({ required: true }) product!: Product;

  isFavorite$!: Observable<boolean>;

  ngOnInit(): void {
    this.isFavorite$ = this.favoritesService.favorites$.pipe(
      map((favIds) => favIds.includes(this.product.id)),
    );
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggle(this.product.id);
  }
}
