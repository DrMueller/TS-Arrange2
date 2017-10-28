import { ElementCollection } from '../../common/models';

import { SourceFile } from 'typescript';

export const ElementCollectionFactoryName: string = 'IElementCollectionFactory';

export interface IElementCollectionFactory {
  createFromSourceFile(sourceFile: SourceFile): ElementCollection;
}