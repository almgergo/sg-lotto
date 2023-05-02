import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserListService} from "@services/user-list.service";
import {User} from "@model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@services/auth.service";
import {Router} from "@angular/router";
import {delay, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePassword = true
  isLoading = false

  users?: Array<User>

  loginForm: FormGroup
  selectedUserControl: FormControl
  userIdControl: FormControl
  passwordControl: FormControl

  getUsersSubscription?: Subscription
  loginSubscription?: Subscription

  constructor(private userListService: UserListService,
              private authService: AuthService,
              private router: Router) {
    // this.selectedUserControl = new FormControl({disabled: this.users === undefined || this.users.length === 0})
    this.selectedUserControl = new FormControl({value: '', disabled: true})
    this.selectedUserControl.valueChanges
      .subscribe((user: User) => this.userIdControl.setValue(user.userId, {emitEvent: false}))

    this.userIdControl = new FormControl('', [Validators.required])
    this.userIdControl.valueChanges.subscribe(() => this.selectedUserControl.setValue(undefined, {emitEvent: false}))

    this.passwordControl = new FormControl('', [Validators.required])

    this.loginForm = new FormGroup({
      user: this.selectedUserControl,
      userId: this.userIdControl,
      password: this.passwordControl
    })
  }

  ngOnInit() {
   this.getUsersSubscription = this.userListService.getUsers()
      .pipe(tap(() => this.selectedUserControl.enable()))
      .subscribe(response => this.users = response)
  }

  ngOnDestroy() {
    this.getUsersSubscription?.unsubscribe()
    this.loginSubscription?.unsubscribe()
  }

  onLogin() {
    const [userId, password] = [this.userIdControl.value, this.passwordControl.value]
    this.isLoading = true
    this.loginSubscription = this.authService
      .signIn(userId, password)
      .subscribe({
        next: value => {
          this.isLoading = false
          if (!value) this.loginForm.setErrors({auth: true})
          else this.router.navigate(["./game"])
        },
        error: err => {
          this.isLoading = false
          this.loginForm.setErrors({auth: true})
        }
      })
  }
}
