import { ElementCollection } from '../../common/models';
import { Configuration } from '../../configuration';

export const ElementSortingServiceName = 'IElementSortingService';

export interface IElementSortingService {
  sortElementsByConfiguration(elements: ElementCollection, configuration: Configuration): void;
}
