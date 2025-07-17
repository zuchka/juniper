import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

// Angular Material Imports
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import { MatBadgeModule } from "@angular/material/badge";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";

interface Customer {
  id: number;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  lastOrder: Date;
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

interface SalesCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

@Component({
  selector: "app-admin-dashboard",
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
    MatStepperModule,
  ],
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
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
      title: "Total Revenue",
      value: "$284,432",
      change: 15.3,
      icon: "monetization_on",
      color: "text-green-600",
    },
    {
      title: "Active Customers",
      value: "8,547",
      change: 8.7,
      icon: "people",
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "12,891",
      change: 12.1,
      icon: "shopping_cart",
      color: "text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: "4.8%",
      change: 2.3,
      icon: "trending_up",
      color: "text-orange-600",
    },
  ];

  customers: Customer[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      totalOrders: 23,
      totalSpent: 2847.5,
      status: "Premium",
      lastOrder: new Date("2024-01-15"),
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      totalOrders: 12,
      totalSpent: 1205.3,
      status: "Active",
      lastOrder: new Date("2024-01-14"),
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Williams",
      email: "emma.w@example.com",
      totalOrders: 8,
      totalSpent: 674.2,
      status: "Active",
      lastOrder: new Date("2024-01-10"),
      avatar: "EW",
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "david.r@example.com",
      totalOrders: 31,
      totalSpent: 4523.75,
      status: "VIP",
      lastOrder: new Date("2024-01-16"),
      avatar: "DR",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      totalOrders: 5,
      totalSpent: 289.4,
      status: "New",
      lastOrder: new Date("2024-01-12"),
      avatar: "LA",
    },
  ];

  chartData: ChartData[] = [
    { label: "Jan", value: 45000 },
    { label: "Feb", value: 52000 },
    { label: "Mar", value: 48000 },
    { label: "Apr", value: 61000 },
    { label: "May", value: 55000 },
    { label: "Jun", value: 67000 },
  ];

  taskProgress = [
    { name: "Holiday Campaign", progress: 85, color: "primary" },
    { name: "Mobile Checkout", progress: 62, color: "accent" },
    { name: "Payment Gateway", progress: 78, color: "primary" },
    { name: "Inventory Sync", progress: 93, color: "primary" },
  ];

  displayedColumns: string[] = [
    "id",
    "name",
    "email",
    "totalOrders",
    "totalSpent",
    "status",
    "lastOrder",
    "actions",
  ];

  menuItems = [
    { name: "Dashboard", icon: "dashboard", route: "/admin" },
    { name: "Orders", icon: "shopping_cart", route: "/admin/orders" },
    { name: "Products", icon: "inventory", route: "/admin/products" },
    { name: "Customers", icon: "people", route: "/admin/customers" },
    { name: "Analytics", icon: "analytics", route: "/admin/analytics" },
    { name: "Settings", icon: "settings", route: "/admin/settings" },
  ];

  notifications = [
    {
      message: "New order #12891 received",
      time: "2 minutes ago",
      type: "info",
    },
    {
      message: "Low inventory alert: iPhone Cases",
      time: "1 hour ago",
      type: "warning",
    },
    {
      message: "Payment failed for order #12889",
      time: "3 hours ago",
      type: "error",
    },
    {
      message: "Daily sales report generated",
      time: "6 hours ago",
      type: "success",
    },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [""],
      email: [""],
      role: [""],
      status: [""],
      department: [""],
    });

    this.settingsForm = this.fb.group({
      notifications: [true],
      darkMode: [false],
      autoSave: [true],
      emailAlerts: [false],
      dataRetention: [30],
    });
  }

  toggleSidenav() {
    this.sidenavOpen.set(!this.sidenavOpen());
  }

  onTabChange(index: number) {
    this.selectedTabIndex.set(index);
  }

  editCustomer(customer: Customer) {
    this.userForm.patchValue(customer);
  }

  deleteCustomer(customerId: number) {
    this.customers = this.customers.filter(
      (customer) => customer.id !== customerId,
    );
  }

  onUserFormSubmit() {
    if (this.userForm.valid) {
      console.log("User form submitted:", this.userForm.value);
      // Handle form submission
    }
  }

  onSettingsFormSubmit() {
    if (this.settingsForm.valid) {
      console.log("Settings form submitted:", this.settingsForm.value);
      // Handle settings update
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case "vip":
        return "text-purple-600";
      case "premium":
        return "text-blue-600";
      case "active":
        return "text-green-600";
      case "new":
        return "text-yellow-600";
      case "inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  }

  getChangeColor(change: number): string {
    return change >= 0 ? "text-green-600" : "text-red-600";
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? "trending_up" : "trending_down";
  }
}
