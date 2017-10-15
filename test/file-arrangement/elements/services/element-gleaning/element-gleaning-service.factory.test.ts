import * as assert from 'assert';
import * as sinon from 'sinon';

import { ElementGleaningServiceFactory } from '../../../../../src/file-arrangement/elements/services';
// tslint:disable-next-line:max-line-length
import { PublicReadonlyFieldGleaningService } from '../../../../../src/file-arrangement/elements/services/element-gleaning/gleaning-services';
import { ConfigurationEntry } from '../../../../../src/file-arrangement/configuration/models';

describe('In the ElementGleaningServiceFactory', () => {
  describe('The createByConfigEntry method', () => {
    describe('With passing configuration for public readdonly field', () => {
      const publicReadOnlyFieldElementName = 'Public Readonly Field';

      it('Should return a Handler for public readonly fields', () => {
        const mockConfigEntry = new ConfigurationEntry(publicReadOnlyFieldElementName, 1, false);

        const elementGleaningService = ElementGleaningServiceFactory.createByConfigEntry(mockConfigEntry);

        const actual = elementGleaningService instanceof PublicReadonlyFieldGleaningService;
        assert.equal(actual, true);
      });
    });
  });
});
