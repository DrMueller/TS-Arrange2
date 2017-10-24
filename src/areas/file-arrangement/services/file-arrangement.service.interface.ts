export const FileArrangemengServiceName = 'IFileArrangemengService';

export interface IFileArrangemengService {
  arrangeOnCurrentDocumentAsync(): Promise<void>;
}