import { TestBed } from '@angular/core/testing';

import { TranslateConfigService } from './translate-config.service';
import { TranslateModule } from '@ngx-translate/core';

describe('TranslateConfigService', () => {
  let service: TranslateConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        TranslateModule.forRoot()
      ]
    });
    service = TestBed.inject(TranslateConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
