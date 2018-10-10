import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square-image',
  templateUrl: './square-image.component.html',
  styleUrls: ['./square-image.component.css']
})
export class SquareImageComponent implements OnInit {
  @Input() image:string;
  @Input() size:string;
  @Input() additionalClasses:string='';

  constructor() { }

  ngOnInit() {
    console.log(this.image);
  }

}
