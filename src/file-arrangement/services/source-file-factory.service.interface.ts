import * as ts from 'typescript';

export const SourceFileFactoryName = 'ISourceFileFactory';

export interface ISourceFileFactory {
  createFromActiveWindow(): ts.SourceFile;
}
