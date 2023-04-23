import {Injectable} from '@angular/core';
import {User} from "@model/user";
import {delay, map, Observable, of} from "rxjs";
import {UserListService} from "@services/user-list.service";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

const ACTIVE_USER_KEY = "activeUser"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users'

  private _user?: User

  public get user(): User | undefined {
    return this._user
  }

  private set user(value: User | undefined) {
    this._user = value
    if (!value) localStorage.removeItem(ACTIVE_USER_KEY)
    else localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(value))
  }

  constructor(private userListService: UserListService, private router: Router, private http: HttpClient) {
    const storedUserString = localStorage.getItem(ACTIVE_USER_KEY)
    this._user = storedUserString ? JSON.parse(storedUserString) : null
  }

  public signIn(userId: string, password: string): Observable<boolean | undefined> {
    if (!password || !userId) return of(undefined)

    return this.http.post<User>(`${this.apiUrl}/${userId}`, {password})
      .pipe(
        map((response: User) => {
          if (response) {
            this.user = response
            return true
          }
          return false
        })
      )
  }

  public signOut() {
    this.user = undefined
    this.router.navigate(["./login"])
  }

  public isLoggedIn() {
    return this.user != undefined
  }
}
