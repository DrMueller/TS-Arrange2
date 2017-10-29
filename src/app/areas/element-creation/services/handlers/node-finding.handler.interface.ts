import { Node } from 'typescript';

import { ISourceFileProxy } from '../../../document-handling';

export const NodeFindingHandlerName: string = 'INodeFindingHandler';

export interface INodeFindingHandler {
  findClassBodyNode(sourceFileProxy: ISourceFileProxy): Node;
}