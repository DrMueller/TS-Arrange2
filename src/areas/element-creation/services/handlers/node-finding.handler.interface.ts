import { Node } from 'typescript';

import { ISourceFileProxy } from '../../../document-handling';

export const NodeFindingHandlerName = 'INodeFindingHandler';

export interface INodeFindingHandler {
  findClassBodyNode(sourceFileProxy: ISourceFileProxy): Node;
}
