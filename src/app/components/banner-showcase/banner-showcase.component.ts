import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { BannerComponent, BannerType } from '../banner/banner.component';

interface BannerExample {
  type: BannerType;
  heading?: string;
  message: string;
  showHeading?: boolean;
  showSecondaryAction?: boolean;
  primaryActionText?: string;
  secondaryActionText?: string;
}

@Component({
  selector: 'app-banner-showcase',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  templateUrl: './banner-showcase.component.html',
  styleUrls: ['./banner-showcase.component.css']
})
export class BannerShowcaseComponent {
  private clipboard = inject(Clipboard);
  private snackBar = inject(MatSnackBar);
  inlineBanners: BannerExample[] = [
    {
      type: 'inline-info',
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-neutral',
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-error',
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-warning',
      message: 'Single line information with an action and dismiss option'
    },
    {
      type: 'inline-success',
      message: 'Single line information with an action and dismiss option'
    }
  ];

  expandedBanners: BannerExample[] = [
    {
      type: 'info',
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'info-neutral',
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'error',
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'warning',
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    },
    {
      type: 'success',
      heading: 'At the moment, we are unable to identify the cause of the connection problem.',
      message: 'Get help from the Builder community. This is the best place to get technical assistance from the team',
      showHeading: true,
      showSecondaryAction: true,
      secondaryActionText: 'Secondary Action'
    }
  ];

  onPrimaryAction(type: string): void {
    console.log(`Primary action clicked for ${type} banner`);
  }

  onSecondaryAction(type: string): void {
    console.log(`Secondary action clicked for ${type} banner`);
  }

  onDismiss(type: string): void {
    console.log(`Dismiss clicked for ${type} banner`);
  }

  generateBannerCode(banner: BannerExample): string {
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

  getInlineBannerCode(banner: BannerExample): string {
    return this.generateBannerCode({
      ...banner,
      primaryActionText: banner.primaryActionText || 'Primary Action'
    });
  }

  getExpandedBannerCode(banner: BannerExample): string {
    return this.generateBannerCode({
      ...banner,
      primaryActionText: banner.primaryActionText || 'Primary Action',
      secondaryActionText: banner.secondaryActionText || 'Secondary Action'
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
