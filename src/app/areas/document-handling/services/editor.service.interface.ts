import { ISourceFileProxy } from '..';
export const EditorServiceName: string = 'IEditorService';

export interface IEditorService {
  createSourceFileFromActiveDocument(): ISourceFileProxy;
  writeTextToActiveDocument(text: string): void;
}
