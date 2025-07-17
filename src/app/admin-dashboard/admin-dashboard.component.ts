import {
  Component,
  signal,
  ViewChild,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, Customer as ApiCustomer } from "../services/api.service";

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
  phone: string;
  city: string;
  age: number;
  department: string;
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

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  university: string;
  department: string;
  city: string;
  country: string;
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
  @ViewChild("usersPaginator") usersPaginator!: MatPaginator;
  @ViewChild("usersSort") usersSort!: MatSort;
  @ViewChild("customersPaginator") customersPaginator!: MatPaginator;
  @ViewChild("customersSort") customersSort!: MatSort;
  @ViewChild("ordersPaginator") ordersPaginator!: MatPaginator;
  @ViewChild("ordersSort") ordersSort!: MatSort;

  // Data sources for tables
  usersDataSource!: MatTableDataSource<User>;
  customersDataSource!: MatTableDataSource<Customer>;
  ordersDataSource!: MatTableDataSource<Order>;

  // Loading states
  isLoadingCustomers = signal(true);
  isLoadingMetrics = signal(true);

  customerNameFilter = new FormControl("");
  customerStatusFilter = new FormControl("");

  orderStatusFilter = new FormControl("");
  orderCustomerFilter = new FormControl("");

  userSearchFilter = new FormControl("");

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

  customers: Customer[] = [];

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
  usersDisplayedColumns: string[] = [
    "id",
    "name",
    "email",
    "phone",
    "age",
    "city",
    "actions",
  ];
  customersDisplayedColumns: string[] = [
    "id",
    "name",
    "email",
    "phone",
    "city",
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

  // Users data from API
  users: User[] = [];

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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
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

    // Initialize data sources with empty arrays
    this.usersDataSource = new MatTableDataSource<User>([]);
    this.customersDataSource = new MatTableDataSource<Customer>([]);
    this.ordersDataSource = new MatTableDataSource<Order>([]);
  }

  ngOnInit() {
    // Set up filter listeners
    this.setupUserFilters();
    this.setupCustomerFilters();
    this.setupOrderFilters();

    // Load real data
    this.loadUsersData();
  }

  loadUsersData() {
    this.isLoadingCustomers.set(true);
    this.isLoadingMetrics.set(true);

    this.apiService.getUsers().subscribe({
      next: (response) => {
        // Load raw users data for users table
        this.users = response.users.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          age: user.age,
          gender: user.gender,
          university: user.university,
          department: user.company.department,
          city: user.address.city,
          country: user.address.country,
          status: Math.random() > 0.8 ? "Inactive" : "Active",
        }));

        this.usersDataSource.data = this.users;

        // Re-apply sorting if sort is available
        if (this.usersSort) {
          this.usersDataSource.sort = this.usersSort;
        }

        // Also load customers data
        this.loadCustomersData();
      },
      error: (error) => {
        console.error("Error loading users data:", error);
        this.isLoadingCustomers.set(false);
        this.isLoadingMetrics.set(false);
      },
    });
  }

  loadCustomersData() {
    this.apiService.getUsersAsCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;
        this.customersDataSource.data = customers;

        // Re-apply sorting if sort is available
        if (this.customersSort) {
          this.customersDataSource.sort = this.customersSort;
        }

        this.generateOrdersFromCustomers(customers);
        this.calculateMetricsFromData(customers);
        this.updateChartData(customers);
        this.isLoadingCustomers.set(false);
        this.isLoadingMetrics.set(false);
      },
      error: (error) => {
        console.error("Error loading customer data:", error);
        this.isLoadingCustomers.set(false);
        this.isLoadingMetrics.set(false);
      },
    });
  }

  ngAfterViewInit() {
    // Set up pagination and sorting for users table
    if (this.usersPaginator && this.usersSort) {
      this.usersDataSource.paginator = this.usersPaginator;
      this.usersDataSource.sort = this.usersSort;

      // Custom sorting for computed name field
      this.usersDataSource.sortingDataAccessor = (
        data: User,
        sortHeaderId: string,
      ) => {
        switch (sortHeaderId) {
          case "name":
            return `${data.firstName} ${data.lastName}`.toLowerCase();
          case "id":
            return data.id;
          case "email":
            return data.email.toLowerCase();
          case "phone":
            return data.phone;
          case "age":
            return data.age;
          case "city":
            return data.city.toLowerCase();
          default:
            return (data as any)[sortHeaderId];
        }
      };
    }

    // Set up pagination and sorting for customers table
    if (this.customersPaginator && this.customersSort) {
      this.customersDataSource.paginator = this.customersPaginator;
      this.customersDataSource.sort = this.customersSort;

      // Custom sorting for customers table
      this.customersDataSource.sortingDataAccessor = (
        data: Customer,
        sortHeaderId: string,
      ) => {
        switch (sortHeaderId) {
          case "name":
            return data.name.toLowerCase();
          case "email":
            return data.email.toLowerCase();
          case "phone":
            return data.phone;
          case "city":
            return data.city.toLowerCase();
          case "totalOrders":
            return data.totalOrders;
          case "totalSpent":
            return data.totalSpent;
          case "status":
            return data.status.toLowerCase();
          case "lastOrder":
            return data.lastOrder.getTime();
          default:
            return (data as any)[sortHeaderId];
        }
      };
    }

    // Set up pagination and sorting for orders table
    if (this.ordersPaginator && this.ordersSort) {
      this.ordersDataSource.paginator = this.ordersPaginator;
      this.ordersDataSource.sort = this.ordersSort;

      // Custom sorting for orders table
      this.ordersDataSource.sortingDataAccessor = (
        data: Order,
        sortHeaderId: string,
      ) => {
        switch (sortHeaderId) {
          case "customer":
            return data.customer.toLowerCase();
          case "product":
            return data.product.toLowerCase();
          case "amount":
            return data.amount;
          case "status":
            return data.status.toLowerCase();
          case "date":
            return data.date.getTime();
          default:
            return (data as any)[sortHeaderId];
        }
      };
    }
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

  setupUserFilters() {
    this.userSearchFilter.valueChanges.subscribe(() => {
      this.applyUserFilters();
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

  applyUserFilters() {
    this.usersDataSource.filterPredicate = (data: User, filter: string) => {
      const searchTerm = this.userSearchFilter.value?.toLowerCase() || "";

      if (!searchTerm) {
        return true;
      }

      const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();
      const email = data.email.toLowerCase();
      const phone = data.phone.toLowerCase();
      const city = data.city.toLowerCase();

      return (
        fullName.includes(searchTerm) ||
        email.includes(searchTerm) ||
        phone.includes(searchTerm) ||
        city.includes(searchTerm)
      );
    };

    this.usersDataSource.filter = "trigger";
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

  clearCustomerFilters() {
    this.customerNameFilter.setValue("");
    this.customerStatusFilter.setValue("");
  }

  clearOrderFilters() {
    this.orderStatusFilter.setValue("");
    this.orderCustomerFilter.setValue("");
  }

  // Action methods
  editUser(user: User) {
    console.log("Edit user:", user);
  }

  deleteUser(userId: number) {
    this.users = this.users.filter((u) => u.id !== userId);
    this.usersDataSource.data = this.users;
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

  getAgeChipClass(age: number): string {
    if (age <= 25) {
      return "age-chip young";
    } else if (age <= 35) {
      return "age-chip adult";
    } else if (age <= 50) {
      return "age-chip middle";
    } else {
      return "age-chip senior";
    }
  }

  // Generate orders based on customer data
  generateOrdersFromCustomers(customers: Customer[]) {
    const orderStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    const productNames = [
      "MacBook Pro",
      "iPhone 15",
      "AirPods Pro",
      "iPad Air",
      "Apple Watch",
      "Samsung Galaxy",
      "Dell Laptop",
      "Sony Headphones",
      "Nike Shoes",
      "Adidas Jacket",
    ];

    this.orders = [];
    let orderId = 12891;

    customers.forEach((customer) => {
      // Generate 1-3 orders per customer
      const numOrders = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numOrders; i++) {
        const randomProduct =
          productNames[Math.floor(Math.random() * productNames.length)];
        const randomStatus =
          orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
        const randomAmount = Math.floor(Math.random() * 500) + 50; // $50-$550

        // Generate random date within last 30 days
        const randomDate = new Date();
        randomDate.setDate(
          randomDate.getDate() - Math.floor(Math.random() * 30),
        );

        this.orders.push({
          id: orderId++,
          customer: customer.name,
          product: randomProduct,
          amount: randomAmount,
          status: randomStatus,
          date: randomDate,
        });
      }
    });

    this.ordersDataSource.data = this.orders;

    // Re-apply sorting if sort is available
    if (this.ordersSort) {
      this.ordersDataSource.sort = this.ordersSort;
    }
  }

  // Calculate real metrics from customer data
  calculateMetricsFromData(customers: Customer[]) {
    // Calculate total revenue from customers
    const totalRevenue = customers.reduce(
      (sum, customer) => sum + customer.totalSpent,
      0,
    );

    // Count active customers (not inactive)
    const activeCustomersCount = customers.filter(
      (customer) => customer.status !== "Inactive",
    ).length;

    // Calculate total orders
    const totalOrders = customers.reduce(
      (sum, customer) => sum + customer.totalOrders,
      0,
    );

    // Calculate average spent per customer for conversion rate simulation
    const avgSpent = customers.length > 0 ? totalRevenue / customers.length : 0;
    const conversionRate = Math.min((avgSpent / 1000) * 10, 15); // Simulate conversion rate

    // Update metric cards with real data
    this.metricCards = [
      {
        title: "Total Revenue",
        value: `$${totalRevenue.toLocaleString()}`,
        change: this.calculateGrowthRate(totalRevenue),
        icon: "monetization_on",
        color: "text-green-600",
      },
      {
        title: "Active Customers",
        value: activeCustomersCount.toString(),
        change: this.calculateGrowthRate(activeCustomersCount),
        icon: "people",
        color: "text-blue-600",
      },
      {
        title: "Total Orders",
        value: totalOrders.toString(),
        change: this.calculateGrowthRate(totalOrders),
        icon: "shopping_cart",
        color: "text-purple-600",
      },
      {
        title: "Avg Spent per Customer",
        value: `$${Math.round(avgSpent)}`,
        change: this.calculateGrowthRate(avgSpent),
        icon: "trending_up",
        color: "text-orange-600",
      },
    ];

    // Update sales cards with real data
    this.salesCards = [
      {
        title: "Total Sales",
        value: `$${Math.round(totalRevenue / 1000)}k`,
        change: `+${Math.round(this.calculateGrowthRate(totalRevenue))}% from yesterday`,
        icon: "sales",
        color: "text-orange-400",
      },
      {
        title: "Total Order",
        value: totalOrders.toString(),
        change: `+${Math.round(this.calculateGrowthRate(totalOrders))}% from yesterday`,
        icon: "order",
        color: "text-teal-400",
      },
      {
        title: "VIP Customers",
        value: customers.filter((c) => c.status === "VIP").length.toString(),
        change: `+${Math.round(Math.random() * 5 + 1)}% from yesterday`,
        icon: "product",
        color: "text-pink-400",
      },
      {
        title: "New Customer",
        value: customers.filter((c) => c.status === "New").length.toString(),
        change: `+${Math.round(Math.random() * 10 + 2)}% from yesterday`,
        icon: "customer",
        color: "text-blue-400",
      },
    ];
  }

  // Calculate a simulated growth rate based on data
  private calculateGrowthRate(value: number): number {
    // Simulate growth rate based on the value
    const baseGrowth = Math.random() * 20; // 0-20%
    const modifier = value > 1000 ? 1.2 : value > 500 ? 1.1 : 1.0;
    return Math.round(baseGrowth * modifier * 100) / 100;
  }

  // Update chart data based on customer data
  updateChartData(customers: Customer[]) {
    // Group customers by city for chart data
    const cityData = customers.reduce(
      (acc, customer) => {
        acc[customer.city] = (acc[customer.city] || 0) + customer.totalSpent;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Get top 6 cities by revenue
    const sortedCities = Object.entries(cityData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6);

    this.chartData = sortedCities.map(([city, revenue]) => ({
      label: city,
      value: revenue,
    }));

    // Update task progress based on customer statuses
    const statusCounts = customers.reduce(
      (acc, customer) => {
        acc[customer.status] = (acc[customer.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    this.taskProgress = [
      {
        name: "VIP Customers",
        progress: Math.round(
          ((statusCounts["VIP"] || 0) / customers.length) * 100,
        ),
        color: "primary",
      },
      {
        name: "Premium Customers",
        progress: Math.round(
          ((statusCounts["Premium"] || 0) / customers.length) * 100,
        ),
        color: "accent",
      },
      {
        name: "Active Customers",
        progress: Math.round(
          ((statusCounts["Active"] || 0) / customers.length) * 100,
        ),
        color: "primary",
      },
      {
        name: "New Customers",
        progress: Math.round(
          ((statusCounts["New"] || 0) / customers.length) * 100,
        ),
        color: "primary",
      },
    ];
  }
}
