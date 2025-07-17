import {
  Component,
  signal,
  ViewChild,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";

// Angular Material Imports
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
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
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";

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

interface Product {
  id: number;
  name: string;
  popularity: number;
  sales: number;
  category: string;
  status: string;
}

interface Order {
  id: number;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: Date;
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
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  // Make Math available in template
  Math = Math;

  // Signals for reactive data
  sidenavOpen = signal(true);
  selectedTabIndex = signal(0);

  // Form groups
  userForm: FormGroup;
  settingsForm: FormGroup;

  // Table ViewChild references
  @ViewChild("productsPaginator") productsPaginator!: MatPaginator;
  @ViewChild("productsSort") productsSort!: MatSort;
  @ViewChild("customersPaginator") customersPaginator!: MatPaginator;
  @ViewChild("customersSort") customersSort!: MatSort;
  @ViewChild("ordersPaginator") ordersPaginator!: MatPaginator;
  @ViewChild("ordersSort") ordersSort!: MatSort;

  // Data sources for tables
  productsDataSource!: MatTableDataSource<Product>;
  customersDataSource!: MatTableDataSource<Customer>;
  ordersDataSource!: MatTableDataSource<Order>;

  // Filter controls
  productNameFilter = new FormControl("");
  productCategoryFilter = new FormControl("");
  productStatusFilter = new FormControl("");

  customerNameFilter = new FormControl("");
  customerStatusFilter = new FormControl("");

  orderStatusFilter = new FormControl("");
  orderCustomerFilter = new FormControl("");

  // Filter options
  productCategories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Health & Beauty",
    "Sports",
    "Books",
  ];
  productStatuses = ["Active", "Inactive", "Out of Stock"];
  customerStatuses = ["VIP", "Premium", "Active", "New", "Inactive"];
  orderStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

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

  salesCards: SalesCard[] = [
    {
      title: "Total Sales",
      value: "$5k",
      change: "+10% from yesterday",
      icon: "sales",
      color: "text-orange-400",
    },
    {
      title: "Total Order",
      value: "500",
      change: "+8% from yesterday",
      icon: "order",
      color: "text-teal-400",
    },
    {
      title: "Product Sold",
      value: "9",
      change: "+2% from yesterday",
      icon: "product",
      color: "text-pink-400",
    },
    {
      title: "New Customer",
      value: "12",
      change: "+3% from yesterday",
      icon: "customer",
      color: "text-blue-400",
    },
  ];

  taskProgress = [
    { name: "Holiday Campaign", progress: 85, color: "primary" },
    { name: "Mobile Checkout", progress: 62, color: "accent" },
    { name: "Payment Gateway", progress: 78, color: "primary" },
    { name: "Inventory Sync", progress: 93, color: "primary" },
  ];

  // Table columns
  productsDisplayedColumns: string[] = [
    "id",
    "name",
    "category",
    "popularity",
    "sales",
    "status",
    "actions",
  ];
  customersDisplayedColumns: string[] = [
    "id",
    "name",
    "email",
    "totalOrders",
    "totalSpent",
    "status",
    "lastOrder",
    "actions",
  ];
  ordersDisplayedColumns: string[] = [
    "id",
    "customer",
    "product",
    "amount",
    "status",
    "date",
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

  // Sample products data
  products: Product[] = [
    {
      id: 1,
      name: "Home Decore Range",
      popularity: 46,
      sales: 46,
      category: "Home & Garden",
      status: "Active",
    },
    {
      id: 2,
      name: "Disney Princess Dress",
      popularity: 17,
      sales: 17,
      category: "Fashion",
      status: "Active",
    },
    {
      id: 3,
      name: "Bathroom Essentials",
      popularity: 19,
      sales: 19,
      category: "Home & Garden",
      status: "Active",
    },
    {
      id: 4,
      name: "Apple Smartwatch",
      popularity: 29,
      sales: 29,
      category: "Electronics",
      status: "Active",
    },
    {
      id: 5,
      name: "Wireless Headphones",
      popularity: 35,
      sales: 35,
      category: "Electronics",
      status: "Active",
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      popularity: 22,
      sales: 22,
      category: "Sports",
      status: "Out of Stock",
    },
    {
      id: 7,
      name: "Coffee Maker Deluxe",
      popularity: 41,
      sales: 41,
      category: "Home & Garden",
      status: "Active",
    },
    {
      id: 8,
      name: "Running Shoes Pro",
      popularity: 38,
      sales: 38,
      category: "Sports",
      status: "Active",
    },
  ];

  // Sample orders data
  orders: Order[] = [
    {
      id: 12891,
      customer: "Sarah Johnson",
      product: "Apple Smartwatch",
      amount: 299.99,
      status: "Delivered",
      date: new Date("2024-01-15"),
    },
    {
      id: 12892,
      customer: "Michael Chen",
      product: "Wireless Headphones",
      amount: 159.99,
      status: "Shipped",
      date: new Date("2024-01-16"),
    },
    {
      id: 12893,
      customer: "Emma Williams",
      product: "Home Decore Range",
      amount: 89.99,
      status: "Processing",
      date: new Date("2024-01-16"),
    },
    {
      id: 12894,
      customer: "David Rodriguez",
      product: "Coffee Maker Deluxe",
      amount: 199.99,
      status: "Pending",
      date: new Date("2024-01-17"),
    },
    {
      id: 12895,
      customer: "Lisa Anderson",
      product: "Disney Princess Dress",
      amount: 49.99,
      status: "Delivered",
      date: new Date("2024-01-17"),
    },
    {
      id: 12896,
      customer: "John Smith",
      product: "Yoga Mat Premium",
      amount: 79.99,
      status: "Cancelled",
      date: new Date("2024-01-18"),
    },
    {
      id: 12897,
      customer: "Anna Taylor",
      product: "Running Shoes Pro",
      amount: 129.99,
      status: "Processing",
      date: new Date("2024-01-18"),
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

    // Initialize data sources
    this.productsDataSource = new MatTableDataSource(this.products);
    this.customersDataSource = new MatTableDataSource(this.customers);
    this.ordersDataSource = new MatTableDataSource(this.orders);
  }

  ngOnInit() {
    // Set up filter listeners
    this.setupProductFilters();
    this.setupCustomerFilters();
    this.setupOrderFilters();
  }

  ngAfterViewInit() {
    // Set up pagination and sorting
    this.productsDataSource.paginator = this.productsPaginator;
    this.productsDataSource.sort = this.productsSort;

    this.customersDataSource.paginator = this.customersPaginator;
    this.customersDataSource.sort = this.customersSort;

    this.ordersDataSource.paginator = this.ordersPaginator;
    this.ordersDataSource.sort = this.ordersSort;
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

  // Filter setup methods
  setupProductFilters() {
    this.productNameFilter.valueChanges.subscribe(() => {
      this.applyProductFilters();
    });

    this.productCategoryFilter.valueChanges.subscribe(() => {
      this.applyProductFilters();
    });

    this.productStatusFilter.valueChanges.subscribe(() => {
      this.applyProductFilters();
    });
  }

  setupCustomerFilters() {
    this.customerNameFilter.valueChanges.subscribe(() => {
      this.applyCustomerFilters();
    });

    this.customerStatusFilter.valueChanges.subscribe(() => {
      this.applyCustomerFilters();
    });
  }

  setupOrderFilters() {
    this.orderStatusFilter.valueChanges.subscribe(() => {
      this.applyOrderFilters();
    });

    this.orderCustomerFilter.valueChanges.subscribe(() => {
      this.applyOrderFilters();
    });
  }

  // Filter application methods
  applyProductFilters() {
    this.productsDataSource.filterPredicate = (
      data: Product,
      filter: string,
    ) => {
      const nameMatch =
        !this.productNameFilter.value ||
        data.name
          .toLowerCase()
          .includes(this.productNameFilter.value.toLowerCase());

      const categoryMatch =
        !this.productCategoryFilter.value ||
        data.category === this.productCategoryFilter.value;

      const statusMatch =
        !this.productStatusFilter.value ||
        data.status === this.productStatusFilter.value;

      return nameMatch && categoryMatch && statusMatch;
    };

    this.productsDataSource.filter = "trigger";
  }

  applyCustomerFilters() {
    this.customersDataSource.filterPredicate = (
      data: Customer,
      filter: string,
    ) => {
      const nameMatch =
        !this.customerNameFilter.value ||
        data.name
          .toLowerCase()
          .includes(this.customerNameFilter.value.toLowerCase());

      const statusMatch =
        !this.customerStatusFilter.value ||
        data.status === this.customerStatusFilter.value;

      return nameMatch && statusMatch;
    };

    this.customersDataSource.filter = "trigger";
  }

  applyOrderFilters() {
    this.ordersDataSource.filterPredicate = (data: Order, filter: string) => {
      const statusMatch =
        !this.orderStatusFilter.value ||
        data.status === this.orderStatusFilter.value;

      const customerMatch =
        !this.orderCustomerFilter.value ||
        data.customer
          .toLowerCase()
          .includes(this.orderCustomerFilter.value.toLowerCase());

      return statusMatch && customerMatch;
    };

    this.ordersDataSource.filter = "trigger";
  }

  // Clear filter methods
  clearProductFilters() {
    this.productNameFilter.setValue("");
    this.productCategoryFilter.setValue("");
    this.productStatusFilter.setValue("");
  }

  clearCustomerFilters() {
    this.customerNameFilter.setValue("");
    this.customerStatusFilter.setValue("");
  }

  clearOrderFilters() {
    this.orderStatusFilter.setValue("");
    this.orderCustomerFilter.setValue("");
  }

  // Action methods
  editProduct(product: Product) {
    console.log("Edit product:", product);
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((p) => p.id !== productId);
    this.productsDataSource.data = this.products;
  }

  viewOrder(order: Order) {
    console.log("View order:", order);
  }

  editOrder(order: Order) {
    console.log("Edit order:", order);
  }

  deleteOrder(orderId: number) {
    this.orders = this.orders.filter((o) => o.id !== orderId);
    this.ordersDataSource.data = this.orders;
  }

  // Helper methods for styling
  getProgressBarClass(popularity: number): string {
    if (popularity >= 40) return "progress-orange";
    if (popularity >= 30) return "progress-pink";
    if (popularity >= 20) return "progress-blue";
    return "progress-teal";
  }

  getSalesChipClass(sales: number): string {
    if (sales >= 40) return "sales-chip orange";
    if (sales >= 30) return "sales-chip pink";
    if (sales >= 20) return "sales-chip blue";
    return "sales-chip teal";
  }

  getStatusChipClass(status: string): string {
    switch (status.toLowerCase()) {
      case "active":
        return "status-chip active";
      case "out of stock":
        return "status-chip out-of-stock";
      case "inactive":
        return "status-chip inactive";
      default:
        return "status-chip";
    }
  }

  getCustomerStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "vip":
        return "status-chip vip";
      case "premium":
        return "status-chip premium";
      case "active":
        return "status-chip active";
      case "new":
        return "status-chip new";
      case "inactive":
        return "status-chip inactive";
      default:
        return "status-chip";
    }
  }

  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "delivered":
        return "status-chip delivered";
      case "shipped":
        return "status-chip shipped";
      case "processing":
        return "status-chip processing";
      case "pending":
        return "status-chip pending";
      case "cancelled":
        return "status-chip cancelled";
      default:
        return "status-chip";
    }
  }
}
