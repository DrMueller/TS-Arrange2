import { ISourceFileProxy } from '..';
export const EditorServiceName = 'IEditorService';

export interface IEditorService {
  createSourceFileFromActiveDocument(): ISourceFileProxy;
  writeTextToActiveDocument(text: string): void;
}
