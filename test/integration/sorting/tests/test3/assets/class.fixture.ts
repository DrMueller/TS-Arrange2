export const ClassFixture =
`import { ConstructableProperty } from 'app/infrastructure/core-services/object-creation';

import { Individual } from './individual.model';

export class Organisation {
  public name: string | undefined = undefined;
  public coName: string | undefined = undefined;

  @ConstructableProperty(Individual)
  public individuals: Individual[] | undefined = undefined;

  @ConstructableProperty(Individual)
  public individual: Individual | undefined = undefined;
}`;
