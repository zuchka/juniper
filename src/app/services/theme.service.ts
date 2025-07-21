import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'juniper-ecommerce-theme';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  // Signal to track current theme
  public readonly currentTheme = signal<ThemeMode>(this.getInitialTheme());
  
  constructor() {
    // Effect to apply theme changes to the document
    effect(() => {
      if (this.isBrowser) {
        this.applyTheme(this.currentTheme());
      }
    });
  }
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * Set a specific theme
   */
  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }
  
  /**
   * Get the initial theme from localStorage or system preference
   */
  private getInitialTheme(): ThemeMode {
    // Only access localStorage in browser environment
    if (this.isBrowser) {
      // Check localStorage first
      const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeMode;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      
      // Fall back to system preference
      if (window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
    }
    
    // Default to dark theme for SSR and fallback
    return 'dark';
  }
  
  /**
   * Apply the theme to the document
   */
  private applyTheme(theme: ThemeMode): void {
    if (this.isBrowser && typeof document !== 'undefined') {
      const body = document.body;
      
      // Remove existing theme classes
      body.classList.remove('light-theme', 'dark-theme');
      
      // Add new theme class
      body.classList.add(`${theme}-theme`);
      
      // Update meta theme-color for mobile browsers
      this.updateMetaThemeColor(theme);
    }
  }
  
  /**
   * Update meta theme-color for mobile browsers
   */
  private updateMetaThemeColor(theme: ThemeMode): void {
    if (this.isBrowser && typeof document !== 'undefined') {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      const color = theme === 'light' ? '#ffffff' : '#171821';
      
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', color);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = color;
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
    }
  }
}
