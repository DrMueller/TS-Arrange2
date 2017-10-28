import { Node } from 'typescript';

import { MappingResult } from './models';

export const NodeElementMappingHandlerName: string = 'INodeElementMappingHandler';

export interface INodeElementMappingHandler {
  mapToElement(node: Node): MappingResult;
}
