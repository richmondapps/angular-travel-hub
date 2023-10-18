import { TestBed } from '@angular/core/testing';

import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigService', () => {
  let service: DynamicFormConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
