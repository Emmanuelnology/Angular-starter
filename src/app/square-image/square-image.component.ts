import { Component, Input } from "@angular/core";

@Component({
  selector: "app-square-image",
  styleUrls: ["./square-image.component.css"],
  templateUrl: "./square-image.component.html",
})
export class SquareImageComponent {
  @Input() public image: string;
  @Input() public size: string;
  @Input() public additionalClasses = "";

}
