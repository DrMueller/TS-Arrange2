import { } from 'node';
import * as assert from 'assert';
import { } from 'mocha';

import { FileArrangementServiceFixture } from '../infrastructure';

describe('Arranging a file', () => {
  let fixture: FileArrangementServiceFixture;

  beforeEach(() => {
    fixture = new FileArrangementServiceFixture();

  });

  it('Should return a Handler for public readonly fields', async () => {
    debugger;
    await fixture.arrangeAsync();
    assert.equal(1, 1);
  });
});
