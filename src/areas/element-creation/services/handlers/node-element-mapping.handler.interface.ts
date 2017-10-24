import { Node } from 'typescript';

import { Element, ElementKindType } from '../../../common/models';

export const NodeElementMappingHandlerName: string = 'INodeElementMappingHandler';

export interface INodeElementMappingHandler {
  mapToElement(node: Node, kindType: ElementKindType): Element;
}
