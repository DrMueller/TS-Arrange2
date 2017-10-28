import { Container } from 'inversify';

import * as services from '../../../areas/file-arrangement/services';
import * as servicesImpl from '../../../areas/file-arrangement/services/implementation';
import * as handlers from '../../../areas/file-arrangement/services/handlers';
import * as handlersImpl from '../../../areas/file-arrangement/services/handlers/implementation';

export class FileArrangementMappingHandler {
  public static applyMappings(container: Container): void {
    container.bind<services.IFileArrangemengService>(services.FileArrangemengServiceName)
      .to(servicesImpl.FileArragementService);

    container.bind<handlers.ISortingHandler>(handlers.SortingHandlerName)
      .to(handlersImpl.SortingHandler);
  }
}