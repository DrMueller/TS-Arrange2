import { injectable } from 'inversify';

import { ISortingHandler } from '..';

import { ElementCollection } from '../../../../common/models';
import { Configuration } from '../../../../configuration';

@injectable()
export class SortingHandler implements ISortingHandler {
  sortElementsByConfiguration(elements: ElementCollection, configuration: Configuration): void {
    const sortedConfigs = configuration.sortingConfigEntries.sort(f => f.sequence);

    
  }

}