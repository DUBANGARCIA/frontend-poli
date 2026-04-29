import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Testimonial } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private http = inject(HttpClient);

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>('data/testimonials.json').pipe(
      catchError(err => {
        console.error('Error cargando testimonios:', err);
        return of([]);
      })
    );
  }
}
