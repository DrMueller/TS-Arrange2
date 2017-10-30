import { } from 'mocha';

import { ClassFixture, LintConfigFixture, ClassResult } from './assets';

import { SortingTestingHandler } from '../../infrastructure';

describe('Sorting all Elements', () => {
  let sortingTestHandler: SortingTestingHandler;

  beforeEach(() => {
    sortingTestHandler = new SortingTestingHandler();
  });

  it('Maps all', () => {
    sortingTestHandler.assertSorting(LintConfigFixture, ClassFixture, ClassResult);
  });
});
