import { Container } from 'inversify';
import 'reflect-metadata';

import * as faServices from '../../file-arrangement/services';
import * as faServicesImpl from '../../file-arrangement/services/implementation';
import { IocContainerSingleton } from './ioc-container.singleton';

export class IocInitializationService {
  public static initialize(): void {
    const container = new Container();
    this.applyMappings(container);
    IocContainerSingleton.initialize(container);
  }

  private static applyMappings(container: Container): void {
    container.bind<faServices.IEditorService>(faServices.EditorServiceName).to(faServicesImpl.EditorService);
    container.bind<faServices.ISourceFileFactory>(faServices.SourceFileFactoryName).to(faServicesImpl.SourceFileFactory);
  }
}
