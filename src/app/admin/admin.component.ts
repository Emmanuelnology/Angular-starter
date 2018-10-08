import { OrderService,IOrder } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  orders;

  constructor(
    private orderService: OrderService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.orderService.getOrders()
      .subscribe(
        orders => {
          this.orders = orders;
          this.spinner.hide();
        },
        error=>{
          console.log(error);
        }
        );
  }
}
