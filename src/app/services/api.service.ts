import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  university: string;
}

export interface DummyJsonResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}

export interface Customer {
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

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "https://dummyjson.com";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<DummyJsonResponse> {
    return this.http.get<DummyJsonResponse>(`${this.baseUrl}/users`);
  }

  getUsersAsCustomers(): Observable<Customer[]> {
    return this.getUsers().pipe(
      map((response: DummyJsonResponse) =>
        response.users.map((user: DummyJsonUser) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          totalOrders: Math.floor(Math.random() * 50) + 1, // Random orders between 1-50
          totalSpent: Math.floor(Math.random() * 5000) + 100, // Random spent between $100-$5100
          status: this.getRandomStatus(),
          lastOrder: this.getRandomLastOrderDate(),
          avatar: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
          phone: user.phone,
          city: user.address.city,
          age: user.age,
          department: user.company.department,
        })),
      ),
    );
  }

  private getRandomStatus(): string {
    const statuses = ["VIP", "Premium", "Active", "New", "Inactive"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  private getRandomLastOrderDate(): Date {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * 30); // Within last 30 days
    const lastOrder = new Date(now);
    lastOrder.setDate(now.getDate() - randomDays);
    return lastOrder;
  }
}
