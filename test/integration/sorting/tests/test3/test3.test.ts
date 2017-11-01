import { } from 'mocha';

import { ClassFixture, LintConfigFixture, ClassResult } from './assets';

import { SortingTestingHandler } from '../../infrastructure';

describe('Integration Test 3', () => {
  let sortingTestHandler: SortingTestingHandler;

  beforeEach(() => {
    sortingTestHandler = new SortingTestingHandler();
  });

  it('Arranges file', () => {
    sortingTestHandler.assertSorting(LintConfigFixture, ClassFixture, ClassResult);
  });
});
