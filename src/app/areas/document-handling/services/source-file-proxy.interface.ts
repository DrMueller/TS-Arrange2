import { Node } from 'typescript';

export const SourceFileProxyName: string = 'ISourceFileProxy';

export interface ISourceFileProxy {
  getFullText(): string;
  getChildren(): Node[];
}
