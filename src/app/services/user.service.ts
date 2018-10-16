import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { FbAuthService } from "../services/fb-auth.service";

import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

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
export class UserService implements OnInit {
  public currentUser$: Observable<any>;
  public currentUser: IUser;
  public users: Observable<any>;
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private fireStore: AngularFirestore,
    private authService: FbAuthService,

    ) {
      this.userCollection = this.fireStore.collection<IUser>("users");

      this.users = this.userCollection.snapshotChanges().pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as IUser;
            data.id = a.payload.doc.id;
            return data;
          });
        }),
      );

      this.currentUser$ = this.authService.getCurrentUserID().pipe(
        switchMap(
        (authState) => {
          return this.userCollection.doc(authState.uid).get()
            .pipe(
              map(
                (user) => {
                  return (user.data() as IUser);
                },
              ),
            );
        },
        ),
      );
    }

    public ngOnInit() {
     // ...
    }

    public getCurrentUser() {
      return this.currentUser;
    }

}
