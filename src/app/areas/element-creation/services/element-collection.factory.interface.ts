import { ElementCollection } from '../../common/models';

import { ISourceFileProxy } from '../../document-handling';

export const ElementCollectionFactoryName: string = 'IElementCollectionFactory';

export interface IElementCollectionFactory {
  createFromSourceFile(sourceFileProxy: ISourceFileProxy): ElementCollection;
}