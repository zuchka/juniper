import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { BannerComponent, BannerType } from '../components/banner/banner.component';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
    ClipboardModule,
    BannerComponent,
    ThemeToggleComponent
  ],
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.css'
})
export class DesignSystemComponent {
  private clipboard = inject(Clipboard);
  private snackBar = inject(MatSnackBar);

  // Component categories for tabs
  componentCategories = [
    { label: 'Banners', value: 'banners', icon: 'campaign' },
    { label: 'Buttons', value: 'buttons', icon: 'smart_button' },
    { label: 'Cards', value: 'cards', icon: 'view_agenda' },
    { label: 'Forms', value: 'forms', icon: 'dynamic_form' },
    { label: 'Navigation', value: 'navigation', icon: 'menu' },
    { label: 'Data Display', value: 'data', icon: 'table_chart' }
  ];

  selectedTab = 0;

  // Banner examples for the design system
  inlineBanners = [
    {
      type: 'inline-info' as BannerType,
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-neutral' as BannerType,
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-error' as BannerType,
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-warning' as BannerType,
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-success' as BannerType,
      message: 'Single line information with an action and dismiss option'
    }
  ];

  expandedBanners = [
    {
      type: 'info' as BannerType,
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'info-neutral' as BannerType,
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'error' as BannerType,
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'warning' as BannerType,
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'success' as BannerType,
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    }
  ];

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  onPrimaryAction(type: string): void {
    console.log(`Primary action clicked for ${type} banner`);
  }

  onSecondaryAction(type: string): void {
    console.log(`Secondary action clicked for ${type} banner`);
  }

  onDismiss(type: string): void {
    console.log(`Dismiss clicked for ${type} banner`);
  }

  generateBannerCode(banner: any): string {
    const attributes = [`type="${banner.type}"`];

    if (banner.heading) {
      attributes.push(`heading="${banner.heading}"`);
    }

    attributes.push(`message="${banner.message}"`);

    if (banner.showHeading) {
      attributes.push(`[showHeading]="true"`);
    }

    if (banner.showSecondaryAction) {
      attributes.push(`[showSecondaryAction]="true"`);
    }

    if (banner.primaryActionText) {
      attributes.push(`primaryActionText="${banner.primaryActionText}"`);
    } else {
      attributes.push(`primaryActionText="Primary Action"`);
    }

    if (banner.secondaryActionText) {
      attributes.push(`secondaryActionText="${banner.secondaryActionText}"`);
    }

    // Add event handlers
    attributes.push(`(primaryAction)="onPrimaryAction()"`);
    attributes.push(`(secondaryAction)="onSecondaryAction()"`);
    attributes.push(`(dismiss)="onDismiss()"`);

    return `<app-banner
  ${attributes.join('\n  ')}>
</app-banner>`;
  }

  copyToClipboard(code: string): void {
    const success = this.clipboard.copy(code);
    if (success) {
      this.snackBar.open('Code copied to clipboard!', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } else {
      this.snackBar.open('Failed to copy code', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  getInlineBannerCode(banner: any): string {
    return this.generateBannerCode({
      ...banner,
      primaryActionText: 'Primary Action'
    });
  }

  getExpandedBannerCode(banner: any): string {
    return this.generateBannerCode({
      ...banner,
      primaryActionText: 'Primary Action'
    });
  }

  getCustomWarningCode(): string {
    return this.generateBannerCode({
      type: 'warning',
      heading: 'System Maintenance Scheduled',
      message: 'We will be performing maintenance on Sunday at 2:00 AM EST. The system will be unavailable for approximately 1 hour.',
      showHeading: true,
      showSecondaryAction: true,
      primaryActionText: 'Learn More',
      secondaryActionText: 'Schedule Reminder'
    });
  }

  getSuccessNotificationCode(): string {
    return this.generateBannerCode({
      type: 'inline-success',
      message: 'Your changes have been saved successfully!',
      primaryActionText: 'View Changes'
    });
  }

  getErrorAlertCode(): string {
    return this.generateBannerCode({
      type: 'error',
      heading: 'Unable to Process Request',
      message: 'There was an error processing your request. Please check your internet connection and try again.',
      showHeading: true,
      primaryActionText: 'Retry'
    });
  }
}
