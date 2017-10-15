export class ClassPrivatePublicFunctions {
  public static ClassPrivatePublicFunctions = `
    import * as vscode from 'vscode';

    import { Constants } from './infrastructure';
    import { TextBuilderService } from './code-document-handling';
    import { ConfigurationService } from './configuration';
    import { ElementGleaningServiceFactory } from './elements';

    export class FileArrangementService {

      private appendElements(text: string, textBuilder: TextBuilderService): void {
        const configEntries = ConfigurationService.readConfigurationCollection();
        configEntries.sortBySequence();

        configEntries.elements.forEach(configEntry => {
          const elementHandler = ElementGleaningServiceFactory.createByConfigEntry(configEntry);
          const elementEntries = elementHandler.getElements(text);

          if (elementEntries.length > 0) {
            textBuilder.appendElements(elementEntries, configEntry.emptyLineBetween);

            if (configEntries.elements.indexOf(configEntry) < (configEntries.elements.length - 1)) {
              textBuilder.appendEmptyLine();
            }
          }
        });
      }

      private getClassHeading(str: string): string {
        const classStartingPos = str.indexOf('export class');
        let elementString = str.substr(0, classStartingPos);
        let i = classStartingPos;

        while (true) {
          const char = str.charAt(i);
          elementString += char;
          if (char === Constants.OPENING_SQUARE_BRACKET) {
            break;
          }

          i++;
        }

        elementString += Constants.NEW_LINE;
        return elementString;
      }
      
      public arrangeWithinClass(text: string): string {
        const classHeadingText = this.getClassHeading(text);

        const textBuilder = new TextBuilderService()
          .appendText(classHeadingText);

        this.appendElements(text, textBuilder);

        const result = textBuilder.appendText(Constants.CLOSING_SQUARE_BRACKET)
          .appendEmptyLine()
          .build();

        return result;
      }
    }`;
}
