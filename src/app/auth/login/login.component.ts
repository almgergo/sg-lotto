import {Component} from '@angular/core';
import {UserListService} from "@services/user-list.service";
import {User} from "@model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword = true
  isLoading = false

  users: Array<User>

  loginForm: FormGroup
  selectedUserControl: FormControl
  userIdControl: FormControl
  passwordControl: FormControl


  constructor(private userListService: UserListService,
              private authService: AuthService,
              private router: Router) {
    this.users = userListService.users

    this.selectedUserControl = new FormControl()
    this.selectedUserControl.valueChanges
      .subscribe((user: User) => this.userIdControl.setValue(user.userId, {emitEvent: false}))

    this.userIdControl = new FormControl('1', [Validators.required])
    this.userIdControl.valueChanges.subscribe(() => this.selectedUserControl.setValue(undefined, {emitEvent: false}))

    this.passwordControl = new FormControl('asdf1234', [Validators.required])

    this.loginForm = new FormGroup({
      user: this.selectedUserControl,
      userId: this.userIdControl,
      password: this.passwordControl
    })
  }

  onLogin() {
    const [userId, password] = [this.userIdControl.value, this.passwordControl.value]
    this.isLoading = true
    this.authService
      .signIn(userId, password)
      .subscribe({
        next: value => {
          this.isLoading = false
          if (!value) this.loginForm.setErrors({auth: true})
          else this.router.navigate(["./game"])
        },
      })
  }
}
