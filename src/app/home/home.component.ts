import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components and Services
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';
import { TestimonialsCarouselComponent } from '../components/testimonials-carousel/testimonials-carousel.component';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ThemeToggleComponent,
    TestimonialsCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly title = signal('angular-demo');
  private themeService = inject(ThemeService);
  
  get currentTheme() {
    return this.themeService.currentTheme();
  }
}
