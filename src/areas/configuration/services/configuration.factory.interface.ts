import { Configuration } from '../models';

export const ConfigurationFactoryName = 'IConfigurationFactory';

export interface IConfigurationFactory {
  createConfigurationAsync(): Promise<Configuration>;
}
