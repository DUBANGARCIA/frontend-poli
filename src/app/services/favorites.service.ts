import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'modastyle_favorites';
  private favoritesSubject = new BehaviorSubject<number[]>(this.loadFromStorage());

  favorites$ = this.favoritesSubject.asObservable();
  count$ = this.favorites$.pipe(map(ids => ids.length));

  private loadFromStorage(): number[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(ids: number[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
    } catch { /* silently fail */ }
  }

  getAll(): number[] {
    return this.favoritesSubject.getValue();
  }

  isFavorite(id: number): boolean {
    return this.getAll().includes(id);
  }

  toggle(id: number): boolean {
    const ids = [...this.getAll()];
    const index = ids.indexOf(id);
    if (index === -1) {
      ids.push(id);
    } else {
      ids.splice(index, 1);
    }
    this.saveToStorage(ids);
    this.favoritesSubject.next(ids);
    return index === -1;
  }
}
