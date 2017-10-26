import { inject, injectable } from 'inversify';
import { Node, SourceFile, SyntaxKind } from 'typescript';

import { IElementCollectionFactory } from '..';
import { IElement, ElementCollection, ElementKindType } from '../../../common/models';
import {
  INodeElementMappingHandler, INodeFindingHandler, NodeElementMappingHandlerName,
  NodeFindingHandlerName
} from '../handlers';

@injectable()
export class ElementCollectionFactory implements IElementCollectionFactory {

  constructor(
    @inject(NodeElementMappingHandlerName) private nodeElementMappingHandler: INodeElementMappingHandler,
    @inject(NodeFindingHandlerName) private nodeFindingHandler: INodeFindingHandler,
  ) { }

  public createFromSourceFile(sourceFile: SourceFile): ElementCollection {
    const classBodyNode = this.nodeFindingHandler.findClassBodyNode(sourceFile);
    const bodyElements = this.getBodyElements(classBodyNode);

    const fullText = sourceFile.getFullText();
    const textBeforeBody = fullText.substr(0, classBodyNode.pos);
    const textAfterBody = fullText.substr(classBodyNode.end, fullText.length);

    const result = new ElementCollection(bodyElements, textBeforeBody, textAfterBody);
    return result;
  }

  private getBodyElements(classBodyNode: Node): IElement[] {
    const children = classBodyNode.getChildren();
    const mainNodes = children.filter(f => f.kind === SyntaxKind.PropertyDeclaration || f.kind === SyntaxKind.MethodDeclaration);

    const result = mainNodes.map(f => {
      return this.nodeElementMappingHandler.mapToElement(f);
    });
    return result;
  }
}