import {TestBed} from "@angular/core/testing";
import {UserListService} from "@services/user-list.service";

describe('UserListService', () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#findUser should return correct user', () => {
    expect(service.findUser("1")?.userId).toBe('1');
  })
});
