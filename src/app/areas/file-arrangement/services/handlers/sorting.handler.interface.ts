import { ElementCollection } from '../../../common/models';

export const SortingHandlerName: string = 'ISortingHandler';
import { Configuration } from '../../../configuration';

export interface ISortingHandler {
  sortElementsByConfiguration(elements: ElementCollection, configuration: Configuration): void;
}
