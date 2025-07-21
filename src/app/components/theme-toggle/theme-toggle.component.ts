import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <button
      mat-icon-button
      class="theme-toggle-button"
      [attr.aria-label]="'Switch to ' + (isDarkMode() ? 'light' : 'dark') + ' mode'"
      [matTooltip]="'Switch to ' + (isDarkMode() ? 'light' : 'dark') + ' mode'"
      (click)="toggleTheme()"
    >
      <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `,
  styles: [`
    .theme-toggle-button {
      color: var(--text-primary);
      transition: all 0.3s ease;
    }
    
    .theme-toggle-button:hover {
      background-color: var(--hover-color);
      transform: scale(1.1);
    }
    
    .theme-toggle-button mat-icon {
      transition: transform 0.3s ease;
    }
    
    .theme-toggle-button:hover mat-icon {
      transform: rotate(180deg);
    }
  `]
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  
  isDarkMode() {
    return this.themeService.currentTheme() === 'dark';
  }
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
