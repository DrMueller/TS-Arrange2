import { ElementLocationBase } from './element-location-base.model';

export class InstanceElementLocation extends ElementLocationBase {
    public get configKey(): string {
        return 'instance';
    }

    public get codeRepresentation(): string {
        return '';
    }
}
