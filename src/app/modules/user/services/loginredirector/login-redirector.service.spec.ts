import { TestBed } from '@angular/core/testing';

import { LoginRedirectorService } from './login-redirector.service';

describe('LoginRedirectorService', () => {
  let service: LoginRedirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRedirectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
