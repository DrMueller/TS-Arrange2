import { Node, SourceFile } from 'typescript';

import { ISourceFileProxy } from '..';

export class SourceFileProxy implements ISourceFileProxy {
  public constructor(private sourceFile: SourceFile) { }

  public getFullText(): string {
    return this.sourceFile.getFullText();
  }

  public getChildren(): Node[] {
    return this.sourceFile.getChildren();
  }
}
