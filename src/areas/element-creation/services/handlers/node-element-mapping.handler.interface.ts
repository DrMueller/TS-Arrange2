import { Node } from 'typescript';

import { MappingResult } from './models';

export const NodeElementMappingHandlerName = 'INodeElementMappingHandler';

export interface INodeElementMappingHandler {
  mapToElement(node: Node): MappingResult;
}
