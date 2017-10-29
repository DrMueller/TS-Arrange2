import { Container } from 'inversify';

import * as services from '../../../areas/file-arrangement/services';
import * as servicesImpl from '../../../areas/file-arrangement/services/implementation';

export class FileArrangementMappingHandler {
  public static applyMappings(container: Container): void {
    container.bind<services.IFileArrangemengService>(services.FileArrangemengServiceName)
      .to(servicesImpl.FileArrangementService);
  }
}
