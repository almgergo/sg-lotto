import { Injectable } from '@angular/core';
import {User} from "@model/user";

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  public users: Array<User> = [
    new User("1", "john@john.com", "asdf1234"),
    new User("2", "peter123", "qwer1234"),
    new User("3", "maunika", "password"),
  ]

  constructor() { }

  public findUser = (userId: string): User | undefined => this.users.find(user => user.userId === userId)

}
