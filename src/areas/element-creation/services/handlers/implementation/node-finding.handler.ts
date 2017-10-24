import { injectable } from 'inversify';

import { Node, SourceFile, SyntaxKind } from 'typescript';

@injectable()
export class NodeFindingHandler {
  public findClassBodyNode(sourceFile: SourceFile): Node {
    const mainNodes = sourceFile.getChildren();
    const allNodes = this.getFlatNodes(...mainNodes);
    const classNode = allNodes.find(f => f.kind === SyntaxKind.ClassDeclaration);

    if (!classNode) {
      throw new Error('Could not find Class keyword.');
    }

    // TODO: There has to be a better way?
    const result = classNode.getChildren().filter(f => f.kind === SyntaxKind.SyntaxList)[2];
    return result;
  }

  private getFlatNodes(...nodes: Node[]): Node[] {
    const result = new Array<Node>();

    nodes.forEach(n => {
      this.appendNodes(n, result);
    });

    return result;
  }

  private appendNodes(node: Node, nodes: Node[]): void {
    nodes.push(node);

    const childNodes = node.getChildren();
    childNodes.forEach(cn => {
      this.appendNodes(cn, nodes);
    });
  }
}