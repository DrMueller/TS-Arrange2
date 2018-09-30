import { injectable } from 'inversify';
import { IConfigFileReader } from '..';

import * as vscode from 'vscode';

@injectable()
export class ConfigFileReader implements IConfigFileReader {
  public async readTsConfigAsync(): Promise<string> {
    const tsLintFiles = await vscode.workspace.findFiles('**/tslint.json');
    const firstTsLint = tsLintFiles[0];

    const textDocument = await vscode.workspace.openTextDocument(firstTsLint);
    const result = textDocument.getText();
    return result;
  }

}
