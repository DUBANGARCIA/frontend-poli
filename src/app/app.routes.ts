import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent)
  },
  {
    path: 'producto/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
