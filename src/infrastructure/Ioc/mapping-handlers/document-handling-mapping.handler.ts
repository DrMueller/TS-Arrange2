import { Container } from 'inversify';

import * as services from '../../../areas/document-handling/services';
import * as servicesImpl from '../../../areas/document-handling/services/implementation';

export class DocumentHandlingMappingHandler {
  public static applyMappings(container: Container): void {
    container.bind<services.IEditorService>(services.EditorServiceName)
      .to(servicesImpl.EditorService);
  }
}
