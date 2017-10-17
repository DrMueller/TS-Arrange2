import * as vscode from 'vscode';

export const EditorServiceName = 'IEditorService';

export interface IEditorService {
  getActiveTextDocument(): vscode.TextDocument;
}
