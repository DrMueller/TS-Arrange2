import { injectable } from 'inversify';
import { getCombinedModifierFlags, ModifierFlags, Node, SyntaxKind } from 'typescript';

import { INodeElementMappingHandler, MappingResult } from '..';
import {
  ElementLocationBase, ElementVisibility, ElementVisibilityType
} from '../../../../common/models';
import {
  ConstructorElement, FieldElement, MethodElement, UnknownElement, GetPropertyElement, SetPropertyElement
} from '../../../../common/models/element-types';
import { StaticElementLocation, InstanceElementLocation } from '../../../../common/models/element-locations';

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

    if (node.kind === SyntaxKind.MethodDeclaration) {
      const methodElement = new MethodElement(visibility, location, nodeText);
      return MappingResult.createdMapped(methodElement);
    }

    if (node.kind === SyntaxKind.GetAccessor) {
      const proprtyElement = new GetPropertyElement(visibility, location, nodeText);
      return MappingResult.createdMapped(proprtyElement);
    }

    if (node.kind === SyntaxKind.SetAccessor) {
      const proprtyElement = new SetPropertyElement(visibility, location, nodeText);
      return MappingResult.createdMapped(proprtyElement);
    }

    const unknownElement = new UnknownElement(nodeText);
    return MappingResult.createdMapped(unknownElement);
  }

  private evaluateLocation(node: Node): ElementLocationBase {
    const modifierFlags = getCombinedModifierFlags(node);

    // tslint:disable-next-line:no-bitwise
    if (modifierFlags & ModifierFlags.Static) {
      return new StaticElementLocation();
    } else {
      return new InstanceElementLocation();
    }
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
