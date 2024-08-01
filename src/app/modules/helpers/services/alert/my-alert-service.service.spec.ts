import { TestBed } from '@angular/core/testing';

import { MyAlertService } from './my-alert-service.service';

describe('MyAlertServiceService', () => {
  let service: MyAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
