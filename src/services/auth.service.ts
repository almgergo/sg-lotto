import {Injectable} from '@angular/core';
import {User} from "@model/user";
import {delay, map, of} from "rxjs";
import {UserListService} from "@services/user-list.service";
import {Router} from "@angular/router";

const ACTIVE_USER_KEY = "activeUser"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user?: User

  public get user(): User | undefined {
    return this._user
  }

  private set user(value: User | undefined) {
    this._user = value
    if (!value) localStorage.removeItem(ACTIVE_USER_KEY)
    else localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(value))
  }

  constructor(private userListService: UserListService, private router: Router) {
    const storedUserString = localStorage.getItem(ACTIVE_USER_KEY)
    this._user = storedUserString ? JSON.parse(storedUserString) : null
  }

  public signIn(userId: string, password: string) {
    if (!password || !userId) return of(false)

    return of({userId, password}).pipe(
      delay(750),
      // Find the user on the "BE" and check the password
      map(({userId: number, password: string}) => {
        const user = this.userListService.findUser(userId)
        if (user?.password === password) {
          this.user = user
          return true
        }
        return false
      }))
  }

  public signOut() {
    this.user = undefined
    this.router.navigate(["./login"])
  }

  public isLoggedIn() {
    return this.user != undefined
  }
}
