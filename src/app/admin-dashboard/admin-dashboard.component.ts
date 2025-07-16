import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: Date;
  avatar: string;
}

interface MetricCard {
  title: string;
  value: number | string;
  change: number;
  icon: string;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatStepperModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  // Make Math available in template
  Math = Math;
  
  // Signals for reactive data
  sidenavOpen = signal(true);
  selectedTabIndex = signal(0);
  
  // Form groups
  userForm: FormGroup;
  settingsForm: FormGroup;

  // Dummy data
  metricCards: MetricCard[] = [
    {
      title: 'Total Users',
      value: '12,345',
      change: 12.5,
      icon: 'people',
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$98,432',
      change: -2.3,
      icon: 'attach_money',
      color: 'text-green-600'
    },
    {
      title: 'Orders',
      value: '2,847',
      change: 8.1,
      icon: 'shopping_cart',
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: 0.8,
      icon: 'trending_up',
      color: 'text-orange-600'
    }
  ];

  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: new Date('2024-01-15'),
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: new Date('2024-01-14'),
      avatar: 'SW'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: new Date('2024-01-10'),
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: new Date('2024-01-15'),
      avatar: 'ED'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'User',
      status: 'Pending',
      lastLogin: new Date('2024-01-12'),
      avatar: 'DB'
    }
  ];

  chartData: ChartData[] = [
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 300 },
    { label: 'Mar', value: 500 },
    { label: 'Apr', value: 280 },
    { label: 'May', value: 450 },
    { label: 'Jun', value: 380 }
  ];

  taskProgress = [
    { name: 'Website Redesign', progress: 85, color: 'primary' },
    { name: 'Mobile App', progress: 62, color: 'accent' },
    { name: 'API Integration', progress: 45, color: 'warn' },
    { name: 'User Testing', progress: 93, color: 'primary' }
  ];

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'lastLogin', 'actions'];

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/admin' },
    { name: 'Users', icon: 'people', route: '/admin/users' },
    { name: 'Analytics', icon: 'analytics', route: '/admin/analytics' },
    { name: 'Orders', icon: 'shopping_cart', route: '/admin/orders' },
    { name: 'Settings', icon: 'settings', route: '/admin/settings' },
    { name: 'Reports', icon: 'assessment', route: '/admin/reports' }
  ];

  notifications = [
    { message: 'New user registered', time: '2 minutes ago', type: 'info' },
    { message: 'Server maintenance scheduled', time: '1 hour ago', type: 'warning' },
    { message: 'Payment processing error', time: '3 hours ago', type: 'error' },
    { message: 'Backup completed successfully', time: '6 hours ago', type: 'success' }
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      role: [''],
      status: [''],
      department: ['']
    });

    this.settingsForm = this.fb.group({
      notifications: [true],
      darkMode: [false],
      autoSave: [true],
      emailAlerts: [false],
      dataRetention: [30]
    });
  }

  toggleSidenav() {
    this.sidenavOpen.set(!this.sidenavOpen());
  }

  onTabChange(index: number) {
    this.selectedTabIndex.set(index);
  }

  editUser(user: User) {
    this.userForm.patchValue(user);
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  onUserFormSubmit() {
    if (this.userForm.valid) {
      console.log('User form submitted:', this.userForm.value);
      // Handle form submission
    }
  }

  onSettingsFormSubmit() {
    if (this.settingsForm.valid) {
      console.log('Settings form submitted:', this.settingsForm.value);
      // Handle settings update
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600';
      case 'inactive': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  }

  getChangeColor(change: number): string {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? 'trending_up' : 'trending_down';
  }
} 