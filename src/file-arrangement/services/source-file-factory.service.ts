import * as ts from 'typescript';

export class SourceFileFactory {
  public createFromActiveWindow(): void {

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return undefined;
    }

    const doc = editor.document;
    const sourceFile = ts.createSourceFile(doc.fileName, doc.getText(), ts.ScriptTarget.Latest, true);
    return { editor, sourceFile };
  }
}
}