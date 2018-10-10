import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input('code') code:number;
  @Input('title') title:string;
  @Input('details') details:string;

  constructor() { }

  ngOnInit() {
  }

}
