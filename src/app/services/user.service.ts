import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { FbAuthService } from "../services/fb-auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface IUser {
  claims: {
    isAdmin: boolean,
  };
  displayName: string;
  email: string;
  id: number;
  taskCount: number;
}

@Injectable()
export class UserService {
  public users: Observable<IUser[]>;
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private fireStore: AngularFirestore,
    ) {
      this.userCollection = this.fireStore.collection<IUser>("users");
      this.users = this.userCollection.valueChanges();
    }

  public getCurrentUser(): IUser {
    return {
      claims: {
        isAdmin: true,
      },
      displayName: "Craig Livings",
      email: "craiglivings@gmail.com",
      id: 1,
      taskCount: 5,
    };
  }
}
