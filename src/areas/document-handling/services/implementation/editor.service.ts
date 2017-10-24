import { injectable } from 'inversify';
import * as ts from 'typescript';
import { window, Range, Position } from 'vscode';

import { IEditorService } from '../editor.service.interface';

@injectable()
export class EditorService implements IEditorService {
  createSourceFileFromActiveDocument(): ts.SourceFile {
    const editor = window.activeTextEditor;
    const document = editor!.document;

    const result = ts.createSourceFile(document.fileName, document.getText(), ts.ScriptTarget.Latest, true);
    return result;
  }

  public writeTextToActiveDocument(text: string): void {
    const textEditor = window.activeTextEditor!;

    const textEditOptions = {
      undoStopBefore: true,
      undoStopAfter: true
    };

    textEditor.edit(f => {
      f.delete(new Range(0, 0, textEditor.document.lineCount, textEditor.document.getText().length));
    }, textEditOptions).then(f => {
      textEditor.edit(t => {
        t.insert(new Position(0, 0), text);
      });
    });
  }
}
