import { Component, Input } from "@angular/core";

@Component({
  selector: "app-error",
  styleUrls: ["./error.component.css"],
  templateUrl: "./error.component.html",
})
export class ErrorComponent {
  @Input("code") public code: number;
  @Input("title") public title: string;
  @Input("details") public details: string;

}
