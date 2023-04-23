import {Injectable} from '@angular/core';
import {User} from "@model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private apiUrl = environment.apiUrl + '/users'

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get<Array<User>>(this.apiUrl)
  }
}
