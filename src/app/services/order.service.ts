import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IOrder{
  id:number
}

@Injectable()
export class OrderService {
  constructor(private http:HttpClient) {}

  getOrders() { 
    return this.http.get("https://demo2781136.mockable.io/api/orders");
  }
}
