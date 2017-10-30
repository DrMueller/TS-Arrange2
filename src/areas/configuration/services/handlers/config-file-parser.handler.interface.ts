import { Configuration } from '../../models';

export const ConfigFileParserName = 'IConfigFileParser';

export interface IConfigFileParser {
  parseLintConfiguration(tsConfigContent: string): Configuration;
}
