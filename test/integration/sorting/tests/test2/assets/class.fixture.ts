export const ClassFixture =
`import { ControlValidationErrorContainer } from './control-validation-error-container';
import { ValidationError } from './validation-error';

export class ValidatedControl {
  private _errorContainer = ControlValidationErrorContainer.nullObject;

  public setValidationErrors(validationErrors: ValidationError[]) {
    this._errorContainer.setValidationErrors(validationErrors);
  }

  public static create(controlName: string, modelPropertyName: string | null = null): ValidatedControl {
    return new ValidatedControl(controlName, modelPropertyName);
  }
}`;
