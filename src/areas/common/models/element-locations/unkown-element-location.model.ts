import { ElementLocationBase } from './element-location-base.model';

export class UnknownElementLocation extends ElementLocationBase {
    public get configKey(): string {
        return 'unknown';
    }

    public get codeRepresentation(): string {
        return '';
    }
}
