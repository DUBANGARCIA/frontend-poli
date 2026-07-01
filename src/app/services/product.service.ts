import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product, ProductDetail } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getCatalogProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('data/catalog.json').pipe(
      catchError((err) => {
        console.error('Error cargando catálogo:', err);
        return of([]);
      }),
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('data/products.json').pipe(
      catchError((err) => {
        console.error('Error cargando productos destacados:', err);
        return of([]);
      }),
    );
  }

  getProductDetail(): Observable<ProductDetail | null> {
    return this.http.get<ProductDetail>('data/product-detail.json').pipe(
      catchError((err) => {
        console.error('Error cargando detalle de producto:', err);
        return of(null);
      }),
    );
  }
}
