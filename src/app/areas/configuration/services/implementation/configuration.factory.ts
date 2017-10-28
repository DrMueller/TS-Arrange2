import { injectable, inject } from 'inversify';

import { IConfigurationFactory } from '..';
import { Configuration } from '../../models';

import {
  ConfigFileParserName, ConfigFileReaderName,
  IConfigFileReader, IConfigFileParser
} from '../handlers';

@injectable()
export class ConfigurationFactory implements IConfigurationFactory {
  public async createConfigurationAsync(): Promise<Configuration> {
    const tsConfigContent = await this.configFileReader.readTsConfigAsync();

    const result = this.configFileParser.parseLintConfiguration(tsConfigContent);
    return result;
  }

  constructor(
    @inject(ConfigFileParserName) private configFileParser: IConfigFileParser,
    @inject(ConfigFileReaderName) private configFileReader: IConfigFileReader
  ) {

  }

}
