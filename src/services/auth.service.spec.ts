import {TestBed} from "@angular/core/testing";
import {AuthService} from "@services/auth.service";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signIn should not work with incorrect password', (done: DoneFn) => {
    service.signIn("2", "asdf1234")?.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  })

  it('#signIn should work with correct password', (done: DoneFn) => {
    service.signIn("1", "asdf1234")?.subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  })
});
