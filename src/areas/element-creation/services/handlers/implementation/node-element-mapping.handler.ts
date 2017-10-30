import { injectable } from 'inversify';
import { getCombinedModifierFlags, ModifierFlags, Node, SyntaxKind } from 'typescript';

import { INodeElementMappingHandler, MappingResult } from '..';
import {
  ElementLocation, ElementLocationType, ElementVisibility, ElementVisibilityType
} from '../../../../common/models';
import {
  ConstructorElement, FieldElement, MethodElement, UnknownElement
} from '../../../../common/models/element-types';

@injectable()
export class NodeElementMappingHelper implements INodeElementMappingHandler {
  public mapToElement(node: Node): MappingResult {

    const visibility = this.evaluateVisibility(node);
    const nodeText = node.getFullText();

    if (node.kind === SyntaxKind.Constructor) {
      const ctorElement = new ConstructorElement(visibility, nodeText);
      return MappingResult.createdMapped(ctorElement);
    }

    const location = this.evaluateLocation(node);
    if (node.kind === SyntaxKind.PropertyDeclaration) {
      const propertyElement = new FieldElement(visibility, location, nodeText);
      return MappingResult.createdMapped(propertyElement);
    }

    // We unite some kinds under the methods
    if (this.checkIfNodeIsMethodType(node)) {
      const methodElement = new MethodElement(visibility, location, nodeText);
      return MappingResult.createdMapped(methodElement);
    }

    const unknownElement = new UnknownElement(nodeText);
    return MappingResult.createdMapped(unknownElement);
  }

  private checkIfNodeIsMethodType(node: Node): boolean {
    return node.kind === SyntaxKind.MethodDeclaration
      || node.kind === SyntaxKind.GetAccessor
      || node.kind === SyntaxKind.SetAccessor;
  }

  private evaluateLocation(node: Node): ElementLocation {
    let locationType: ElementLocationType;

    const modifierFlags = getCombinedModifierFlags(node);

    if (modifierFlags === ModifierFlags.Static) {
      locationType = ElementLocationType.Static;
    } else {
      locationType = ElementLocationType.Instance;
    }

    const result = new ElementLocation(locationType);
    return result;
  }

  private evaluateVisibility(node: Node): ElementVisibility {
    let visibilityType: ElementVisibilityType;

    const modifierFlags = getCombinedModifierFlags(node);

    // tslint:disable-next-line:no-bitwise
    if (modifierFlags & ModifierFlags.Public) {
      visibilityType = ElementVisibilityType.Public;
    // tslint:disable-next-line:no-bitwise
    } else if (modifierFlags & ModifierFlags.Protected) {
      visibilityType = ElementVisibilityType.Protected;
    // tslint:disable-next-line:no-bitwise
    } else if (modifierFlags & ModifierFlags.Private) {
      visibilityType = ElementVisibilityType.Private;
    } else {
      visibilityType = ElementVisibilityType.Unknown;
    }

    const result = new ElementVisibility(visibilityType);
    return result;
  }
}
