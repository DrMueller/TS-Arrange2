import { Container } from 'inversify';
import 'reflect-metadata';

import { IocContainerSingleton } from './ioc-container.singleton';
import * as mh from './mapping-handlers';

export class IocInitializationService {
  public static initialize(): void {
    const container = new Container();
    this.applyMappings(container);
    IocContainerSingleton.initialize(container);
  }

  private static applyMappings(container: Container): void {
    mh.FileArrangementMappingHandler.applyMappings(container);
    mh.DocumentHandlingMappingHandler.applyMappings(container);
    mh.ConfigurationMappingHandler.applyMappings(container);
    mh.ElementCreationMappingHandler.applyMappings(container);
    mh.ElementSortingMappingHandler.applyMappings(container);
  }
}
