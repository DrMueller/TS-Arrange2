import { Node } from 'typescript';

import { ElementKindType, IElement } from '../../../common/models';

export const NodeElementMappingHandlerName: string = 'INodeElementMappingHandler';

export interface INodeElementMappingHandler {
  mapToElement(node: Node): IElement;
}
