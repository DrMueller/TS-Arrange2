import { Container } from 'inversify';

import * as services from '../../../areas/element-creation/services';
import * as handlers from '../../../areas/element-creation/services/handlers';
import * as handlersImpl from '../../../areas/element-creation/services/handlers/implementation';
import * as servicesImpl from '../../../areas/element-creation/services/implementation';

export class ElementCreationMappingHandler {
  public static applyMappings(container: Container): void {
    container.bind<services.IElementCollectionFactory>(services.ElementCollectionFactoryName)
      .to(servicesImpl.ElementCollectionFactory);

    container.bind<handlers.INodeElementMappingHandler>(handlers.NodeElementMappingHandlerName)
      .to(handlersImpl.NodeElementMappingHelper);

    container.bind<handlers.INodeFindingHandler>(handlers.NodeFindingHandlerName)
      .to(handlersImpl.NodeFindingHandler);
  }
}
