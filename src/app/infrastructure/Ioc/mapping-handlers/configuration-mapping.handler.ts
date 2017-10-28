import { Container } from 'inversify';

import * as services from '../../../areas/configuration/services';
import * as servicesImpl from '../../../areas/configuration/services/implementation';
import * as handlers from '../../../areas/configuration/services/handlers';
import * as handlersImpl from '../../../areas/configuration/services/handlers/implementation';

export class ConfigurationMappingHandler {
  public static applyMappings(container: Container): void {
    container.bind<services.IConfigurationFactory>(services.ConfigurationFactoryName)
      .to(servicesImpl.ConfigurationFactory);

    container.bind<handlers.IConfigFileParser>(handlers.ConfigFileParserName)
      .to(handlersImpl.ConfigFileParser);

    container.bind<handlers.IConfigFileReader>(handlers.ConfigFileReaderName)
      .to(handlersImpl.ConfigFileReader);
  }
}
