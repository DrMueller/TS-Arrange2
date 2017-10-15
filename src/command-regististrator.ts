import * as vscode from 'vscode';

export class CommandRegistrator {
  public registerAllCommands(context: vscode.ExtensionContext): void {
    const arrangeFileCommand = vscode.commands.registerCommand('extension.arrangeFile', () => {
      try {
        vscode.window.showInformationMessage('tra');

      } catch (err) {
        vscode.window.showErrorMessage(err.message);
      }
    });

    context.subscriptions.push(arrangeFileCommand);
  }
}
