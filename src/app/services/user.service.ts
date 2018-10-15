import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";

import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface IUser {
  claims: {
    isAdmin: boolean,
  };
  displayName: string;
  email: string;
  id: string;
  taskCount: number;
}

@Injectable()
export class UserService implements OnInit{
  public currentUser$: Observable<any>;
  public currentUser: IUser;
  public users: Observable<any>;
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private fireStore: AngularFirestore,
    ) {
      this.userCollection = this.fireStore.collection<IUser>("users");
      // this.users = this.userCollection.valueChanges();
      this.users = this.userCollection.snapshotChanges().pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as IUser;
            data.id = a.payload.doc.id;
            return data;
          });
        }),
      );

      const id = "EuN1EEIkWqgmhkHQdvEKeg3xP052";
      this.currentUser$ = this.userCollection.doc(id).get();
      this.currentUser$.subscribe(
        (user) => {
          this.currentUser = (user.data() as IUser);
        },
      );
    }

    public ngOnInit() {
     // ...
    }

    public getCurrentUser() {
      return this.currentUser;
    }

}
