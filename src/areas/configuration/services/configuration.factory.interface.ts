import { Configuration } from '../models';

export const ConfigurationFactoryName: string = 'IConfigurationFactory';

export interface IConfigurationFactory {
  createConfigurationAsync(): Promise<Configuration>;
}
