import { ElementLocationBase } from './element-location-base.model';

export class StaticElementLocation extends ElementLocationBase {
    public get configKey(): string {
        return 'static';
    }

    public get codeRepresentation(): string {
        return 'static';
    }
}
