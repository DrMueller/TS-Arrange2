import { Container } from 'inversify';

import * as services from '../../../areas/element-sorting/services';
import * as servicesImpl from '../../../areas/element-sorting/services/implementation';

export class ElementSortingMappingHandler {
  public static applyMappings(container: Container): void {
    container.bind<services.IElementSortingService>(services.ElementSortingServiceName)
      .to(servicesImpl.ElementSortingService);
  }
}
