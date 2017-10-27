import { injectable } from 'inversify';
import * as _ from 'lodash';

import { ISortingHandler } from '..';
import { ElementCollection, IElement } from '../../../../common/models';
import { Configuration } from '../../../../configuration';
import { ElementBlock, SortedElementCollection } from '../../../models';

@injectable()
export class SortingHandler implements ISortingHandler {
  sortElementsByConfiguration(elements: ElementCollection, configuration: Configuration): void {
    const sortedArray = new Array<Array<IElement>>();

    const grpedElements = _.groupBy(elements.bodyElements, f => f.getConfigKey());
    const elementAreaKeys = Object.keys(grpedElements);
    const sortedElementsCol = new SortedElementCollection();

    elementAreaKeys.forEach(key => {
      const blockElements = grpedElements[key];
      const maybeConfigEntry = configuration.tryGetConfigEntry(key);
      maybeConfigEntry.whenSome(config => {
        sortedElementsCol.addKnownBlock(new ElementBlock(blockElements, config.sequence));
      });
      maybeConfigEntry.whenNone(() => {
        sortedElementsCol.addUnknownElements(blockElements);
      });
    });

    const sortedElements = sortedElementsCol.sortAndGetFlatList();
    elements.overwriteBodyElements(sortedElements);
  }

}