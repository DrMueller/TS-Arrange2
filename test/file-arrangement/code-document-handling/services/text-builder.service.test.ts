import * as assert from 'assert';

import { TextBuilderService } from '../../../../src/file-arrangement/code-document-handling';
import { ElementCollection, Element } from '../../../../src/file-arrangement/elements/models';
import { Constants } from '../../../../src/file-arrangement/infrastructure';

describe('In the textbuilder.service', function () {
  let sut = new TextBuilderService();

  describe('The build function', function () {

    describe('Without passed elements or text', () => {
      sut = new TextBuilderService();
      const actual = sut.build();

      it('Should return an empty string', () => {
        assert.equal(actual, '');
      });
    });

    describe('With appended empty line', () => {
      sut = new TextBuilderService();
      sut.appendEmptyLine();
      const actual = sut.build();

      it('Should return an empty line', () => {
        assert.equal(actual, Constants.NEW_LINE);
      });
    });

    describe('Without appended text', () => {
      sut = new TextBuilderService();
      sut.appendText('TEST');
      const actual = sut.build();

      it('Should return appended text', () => {
        assert.equal(actual, 'TEST');
      });
    });

    describe('With appended Elementcollection', () => {
      let stubElementCollection: ElementCollection;

      describe('With empty lines between', () => {
        beforeEach(() => {
          stubElementCollection = new ElementCollection(1, 'test 123', [
            new Element('Test 1'),
            new Element('Test 2'),
            new Element('Test 3')
          ]);
        });

        it('Should return two empty lines between the elements', () => {
          sut = new TextBuilderService();
          sut.appendElements(stubElementCollection, true);

          const actual = sut.build();

          assert.equal(actual.split(Constants.NEW_LINE).length - 1, 2);
        });

        it('Should return three elements', () => {
          sut = new TextBuilderService();
          sut.appendElements(stubElementCollection, true);

          const actual = sut.build();

          assert.notEqual(actual.indexOf('Test 1'), -1);
          assert.notEqual(actual.indexOf('Test 2'), -1);
          assert.notEqual(actual.indexOf('Test 3'), -1);
        });
      });

      describe('Without empty lines between', () => {

        it('Should return no empty lines between the elements', () => {
          sut = new TextBuilderService();
          sut.appendElements(stubElementCollection, true);

          const actual = sut.build();

          assert.equal(actual.split('\r\n').length - 1, 0);
        });

        it('Should return three elements', () => {
          sut = new TextBuilderService();
          sut.appendElements(stubElementCollection, true);

          const actual = sut.build();

          assert.notEqual(actual.indexOf('Test 1'), -1);
          assert.notEqual(actual.indexOf('Test 2'), -1);
          assert.notEqual(actual.indexOf('Test 3'), -1);
        });
      });
    });
  });
});
