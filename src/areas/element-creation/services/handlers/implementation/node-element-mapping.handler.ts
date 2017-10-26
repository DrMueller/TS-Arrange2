import { injectable } from 'inversify';

import { getCombinedModifierFlags, ModifierFlags, Node } from 'typescript';

import { INodeElementMappingHandler } from '..';
import {
  IElement, ElementKind, ElementKindType, ElementLocation, ElementLocationType, ElementVisibility,
  ElementVisibilityType
} from '../../../../common/models';

import {
  ConstructorElement, MethodElement
} from '../../../../common/models/element-types';

@injectable()
export class NodeElementMappingHelper implements INodeElementMappingHandler {
  public mapToElement(node: Node): IElement {
    const visibility = this.evaluateVisibility(node);

    const text = node.getFullText();

    if (kindType === ElementKindType.Constructor) {
      return new ConstructorElement(visibility, kind, text);
    }

    const location = this.evaluateLocation(node);
    return new MethodElement(visibility, location, kind, text);
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

    if (modifierFlags === ModifierFlags.Public) {
      visibilityType = ElementVisibilityType.Public;
    } else if (modifierFlags === ModifierFlags.Protected) {
      visibilityType = ElementVisibilityType.Protected;
    } else if (modifierFlags === ModifierFlags.Private) {
      visibilityType = ElementVisibilityType.Private;
    } else {
      visibilityType = ElementVisibilityType.Unknown;
    }

    const result = new ElementVisibility(visibilityType);
    return result;
  }
}
