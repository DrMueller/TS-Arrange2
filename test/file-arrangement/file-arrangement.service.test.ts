import * as assert from 'assert';

import { ClassPrivatePublicFunctions } from '../test-data';
import { FileArrangementService } from '../../src/file-arrangement/file-arrangement.service';

describe('In the file-arrangement.service', function () {
  const sut = new FileArrangementService();

  describe('The arrangeWithinClass function', () => {
    let actual: string;

    beforeEach(() => {
      const mockText = ClassPrivatePublicFunctions.ClassPrivatePublicFunctions;
      actual = sut.arrangeWithinClass(mockText);
    });

    it('Should return 5 Import-Statements', function () {
      assert.equal(actual.split('import').length - 1, 5);
    });

    it('Should return 2 private methods', function () {
      assert.equal(actual.split('import').length - 1, 5);
    });

    it('Should return 1 public method', function () {
      assert.equal(actual.split('public').length - 1, 1);
    });

    it('Should return no constructor', function () {
      assert.equal(actual.split('constructor').length - 1, 0);
    });
  });
});
