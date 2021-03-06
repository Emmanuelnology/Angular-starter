import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  taskCount: number;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get("https://demo1917475.mockable.io/users");
  }
}
