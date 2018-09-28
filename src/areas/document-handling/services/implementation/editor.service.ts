import { injectable } from 'inversify';
import { createSourceFile, ScriptTarget } from 'typescript';
import { Position, Range, window } from 'vscode';

import { SourceFileProxy } from '.';
import { ISourceFileProxy } from '..';
import { IEditorService } from '../editor.service.interface';

@injectable()
export class EditorService implements IEditorService {
  createSourceFileFromActiveDocument(): ISourceFileProxy {
    const editor = window.activeTextEditor;
    const document = editor!.document;

    const sourceFile = createSourceFile(document.fileName, document.getText(), ScriptTarget.Latest, true);
    const result = new SourceFileProxy(sourceFile);
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
    }, textEditOptions).then(_ => {
      textEditor.edit(t => {
        t.insert(new Position(0, 0), text);
      });
    });
  }
}
