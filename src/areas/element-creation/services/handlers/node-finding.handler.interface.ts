import { SourceFile, Node } from 'typescript';

export const NodeFindingHandlerName: string = 'INodeFindingHandler';

export interface INodeFindingHandler {
  findClassBodyNode(sourceFile: SourceFile): Node;
}