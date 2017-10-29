import { injectable } from 'inversify';

import { Node, SyntaxKind } from 'typescript';

import { ISourceFileProxy } from '../../../../document-handling';

@injectable()
export class NodeFindingHandler {
  public findClassBodyNode(sourceFileProxy: ISourceFileProxy): Node {

    // We expect always 2 nodes here: One SyntaxList and one EndOfFile
    const syntaxListNode = sourceFileProxy.getChildren().find(f => f.kind === SyntaxKind.SyntaxList);
    if (!syntaxListNode) {
      throw new Error('Could not find Syntax List Node');
    }

    // Well, we expect a ClassDeclaration node
    const classNode = syntaxListNode.getChildren().find(f => f.kind === SyntaxKind.ClassDeclaration);
    if (!classNode) {
      throw new Error('Could not find Class keyword.');
    }

    const classChildren = classNode.getChildren();
    const syntaxElements = classChildren.filter(f => f.kind === SyntaxKind.SyntaxList);
    const bodyNode = syntaxElements[syntaxElements.length - 1];
    return bodyNode;
  }
}
