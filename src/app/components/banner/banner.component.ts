import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type BannerType = 
  | 'info' 
  | 'info-neutral' 
  | 'error' 
  | 'warning' 
  | 'success' 
  | 'inline-info' 
  | 'inline-neutral' 
  | 'inline-error' 
  | 'inline-warning' 
  | 'inline-success';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() type: BannerType = 'info';
  @Input() heading: string = '';
  @Input() message: string = '';
  @Input() primaryActionText: string = 'Primary Action';
  @Input() secondaryActionText: string = 'Secondary Action';
  @Input() showDismiss: boolean = true;
  @Input() showPrimaryAction: boolean = true;
  @Input() showSecondaryAction: boolean = false;
  @Input() showHeading: boolean = false;
  
  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  get isInline(): boolean {
    return this.type.startsWith('inline-');
  }

  get iconName(): string {
    switch (this.type) {
      case 'info':
      case 'info-neutral':
      case 'inline-info':
      case 'inline-neutral':
        return 'info';
      case 'error':
      case 'inline-error':
        return 'error';
      case 'warning':
      case 'inline-warning':
        return 'warning';
      case 'success':
      case 'inline-success':
        return 'check_circle';
      default:
        return 'info';
    }
  }

  onPrimaryAction(): void {
    this.primaryAction.emit();
  }

  onSecondaryAction(): void {
    this.secondaryAction.emit();
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
