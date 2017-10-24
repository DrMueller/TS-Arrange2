import * as ts from 'typescript';

export const EditorServiceName: string = 'IEditorService';

export interface IEditorService {
  createSourceFileFromActiveDocument(): ts.SourceFile;
  writeTextToActiveDocument(text: string): void;
}
