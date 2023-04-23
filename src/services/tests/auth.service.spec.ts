import {TestBed} from "@angular/core/testing";
import {AuthService} from "@services/auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "@model/user";
import {environment} from "../../environments/environment";

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signIn should not work with incorrect password', (done: DoneFn) => {
    const testUser: User | null = null

    service.signIn("2", "3").subscribe((isSuccess) => {
      expect(isSuccess).toBe(false)
    })

    const req = httpTestingController.expectOne(`${environment.apiUrl}/users/2`)
    req.flush(testUser)

    done()
  })
  //
  it('#signIn should work with correct password', (done: DoneFn) => {
    const testUser: User = new User("2", "tester", "2")

    service.signIn("2", "2").subscribe((isSuccess) => {
      expect(isSuccess).toBe(true)
    })

    const req = httpTestingController.expectOne(`${environment.apiUrl}/users/2`)
    req.flush(testUser)

    done()
  })
});
