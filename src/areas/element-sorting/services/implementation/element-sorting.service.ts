import { IElementSortingService } from '..';

import { ElementCollection } from '../../../common/models';
import { Configuration } from '../../../configuration';

import { ElementBlock, SortedElementCollection } from '../../models';

import { injectable } from 'inversify';
import * as _ from 'lodash';

@injectable()
export class ElementSortingService implements IElementSortingService {
  public sortElementsByConfiguration(elements: ElementCollection, configuration: Configuration): void {
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
