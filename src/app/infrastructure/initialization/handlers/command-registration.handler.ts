import * as vscode from 'vscode';

import {
  FileArrangemengServiceName, IFileArrangemengService
} from '../../../areas/file-arrangement';
import { IocContainerSingleton } from '../../../infrastructure/Ioc';

export class CommandRegistrationHandler {
  public static registerCommands(context: vscode.ExtensionContext): void {
    CommandRegistrationHandler.registerArrangeFileCommand(context);
  }

  private static registerArrangeFileCommand(context: vscode.ExtensionContext): void {
    const arrangeFileCommand = vscode.commands.registerCommand('extension.arrangeFile', () => {
      try {
        const fileArrangementService = IocContainerSingleton.resolve<IFileArrangemengService>(FileArrangemengServiceName);
        fileArrangementService.arrangeOnCurrentDocumentAsync();
      } catch (err) {
        vscode.window.showErrorMessage(err.message);
      }
    });

    context.subscriptions.push(arrangeFileCommand);
  }
}
