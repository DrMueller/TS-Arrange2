import { inject, injectable } from 'inversify';
import { Node, SourceFile, SyntaxKind } from 'typescript';

import { IElementCollectionFactory } from '..';
import { Element, ElementCollection, ElementKindType } from '../../../common/models';
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

  private getBodyElements(classBodyNode: Node): Element[] {
    const result = new Array<Element>();
    const children = classBodyNode.getChildren();

    this.applyMethods(children, result);
    this.applyProperties(children, result);

    return result;
  }

  private applyProperties(nodes: Node[], elements: Element[]): void {
    const properties = nodes.filter(f => f.kind === SyntaxKind.PropertyDeclaration);

    const propertyElements = properties.map(n => {
      return this.nodeElementMappingHandler.mapToElement(n, ElementKindType.Property);
    });

    elements.push(...propertyElements);
  }

  private applyMethods(nodes: Node[], elements: Element[]): void {
    const methods = nodes.filter(f => f.kind === SyntaxKind.MethodDeclaration);

    const methodElements = methods.map(n => {
      return this.nodeElementMappingHandler.mapToElement(n, ElementKindType.Method);
    });

    elements.push(...methodElements);
  }

}