export const ConfigFileReaderName = 'IConfigFileReader';

export interface IConfigFileReader {
  readTsConfigAsync(): Promise<string>;
}
