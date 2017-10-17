import { inject, injectable } from 'inversify';
import * as ts from 'typescript';

import { EditorServiceName, IEditorService } from '../editor.service.interface';
import { ISourceFileFactory } from '../source-file-factory.service.interface';

@injectable()
export class SourceFileFactory {
  constructor(
    @inject(EditorServiceName) private editorService: IEditorService
  ) {
  }

  public createFromActiveWindow(): ts.SourceFile {
    debugger;
    const doc = this.editorService.getActiveTextDocument();
    const result = ts.createSourceFile(doc.fileName, doc.getText(), ts.ScriptTarget.Latest, true);
    return result;
  }
}
