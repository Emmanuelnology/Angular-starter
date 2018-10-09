import { OrderService,IOrder } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private hideSpinner:boolean;
  orders;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders()
      .subscribe(
        orders => {
          this.orders = orders;
          this.hideSpinner=true;
        },
        error=>{
          console.log(error);
        }
        );
  }
}
