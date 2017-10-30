import { Node } from 'typescript';

export const SourceFileProxyName = 'ISourceFileProxy';

export interface ISourceFileProxy {
  getFullText(): string;
  getChildren(): Node[];
}
