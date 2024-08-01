import { TestBed } from '@angular/core/testing';

import { MessagesBrokerService } from './messages-broker.service';

describe('MessagesBrokerService', () => {
  let service: MessagesBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
