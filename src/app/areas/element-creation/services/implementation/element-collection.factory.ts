import { inject, injectable } from 'inversify';
import { Node } from 'typescript';

import { IElementCollectionFactory } from '..';
import { IElement, ElementCollection } from '../../../common/models';
import {
  INodeElementMappingHandler, INodeFindingHandler, NodeElementMappingHandlerName,
  NodeFindingHandlerName
} from '../handlers';

import { ISourceFileProxy } from '../../../document-handling';

@injectable()
export class ElementCollectionFactory implements IElementCollectionFactory {
  constructor(
    @inject(NodeElementMappingHandlerName) private nodeElementMappingHandler: INodeElementMappingHandler,
    @inject(NodeFindingHandlerName) private nodeFindingHandler: INodeFindingHandler,
  ) { }

  public createFromSourceFile(sourceFileProxy: ISourceFileProxy): ElementCollection {
    const classBodyNode = this.nodeFindingHandler.findClassBodyNode(sourceFileProxy);
    const bodyElements = this.getBodyElements(classBodyNode);

    const fullText = sourceFileProxy.getFullText();
    const textBeforeBody = fullText.substr(0, classBodyNode.pos);
    const textAfterBody = fullText.substr(classBodyNode.end, fullText.length);

    const result = new ElementCollection(bodyElements, textBeforeBody, textAfterBody);
    return result;
  }

  private getBodyElements(classBodyNode: Node): IElement[] {
    const children = classBodyNode.getChildren();

    const mappingResults = children.map(f => {
      return this.nodeElementMappingHandler.mapToElement(f);
    });

    var resultElements = mappingResults.filter(f => f.isMapped).map(f => f.mappedElement!);
    return resultElements;
  }
}