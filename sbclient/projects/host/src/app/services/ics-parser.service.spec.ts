import { TestBed } from '@angular/core/testing';

import { IcsParserService } from './ics-parser.service';

describe('IcsParserService', () => {
  let service: IcsParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcsParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
