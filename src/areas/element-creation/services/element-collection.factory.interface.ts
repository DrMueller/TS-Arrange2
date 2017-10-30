import { ElementCollection } from '../../common/models';
import { ISourceFileProxy } from '../../document-handling';

export const ElementCollectionFactoryName = 'IElementCollectionFactory';

export interface IElementCollectionFactory {
  createFromSourceFile(sourceFileProxy: ISourceFileProxy): ElementCollection;
}
