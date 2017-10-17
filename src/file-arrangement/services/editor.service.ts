import * as vscode from 'vscode';

export class EditorService {
  public getActiveTextDocument(): vscode.TextDocument {
    const editor = vscode.window.activeTextEditor;
    const result = editor!.document;

    return result;
  }
}
