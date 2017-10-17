import * as vscode from 'vscode';

import { injectable, inject } from 'inversify';

import { IEditorService } from '..';

@injectable()
export class EditorService implements IEditorService {
  public getActiveTextDocument(): vscode.TextDocument {
    const editor = vscode.window.activeTextEditor;
    const result = editor!.document;

    return result;
  }
}
