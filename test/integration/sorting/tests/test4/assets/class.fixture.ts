export const ClassFixture = `
import * as moment from 'moment';
import * as React from 'react';
import { NcFilterRepository } from 'src/sharedDomain/filter/dataAccess/ncFilterRepository';

import { INcFilterCollection } from '../../../../sharedDomain/filter/models/ncFilterCollection';
import NcSingleDateFilterComponent from '../ncSingleDateFilter/ncSingleDateFilterComponent';
import { INcFilterPaneProps } from './models/ncFilterPaneProps';
import { INcFilterPaneState } from './models/ncFilterPaneState';
import styles from './NcFilterPane.module.scss';
import { NcSingleDateFilter } from 'src/sharedDomain/filter/implementations/ncSingleDateFilter';

export default class NcFilterPaneComponent extends React.Component<INcFilterPaneProps, INcFilterPaneState> {


  private readonly ncFilterUrlParamName = "ncFilter";

  private _ncFilterRepository: NcFilterRepository;

  public constructor(props: INcFilterPaneProps) {
    super(props);
    this._ncFilterRepository = new NcFilterRepository();
    this.state = this.initState();
  }

  private initState(): INcFilterPaneState {
    let filters = this._ncFilterRepository.getFilters();
    return { filters: filters, newFilterName: "newFilter" };
  }

  private handleApplyNewFilter = () => {
    this._ncFilterRepository.setFilters(this.state.filters);
  }

  private handleNewDateFilter = () => {
    const filters: INcFilterCollection = this.state.filters;
    filters.items.push(new NcSingleDateFilter(this.state.newFilterName, moment().startOf('day').format('YYYY-MM-DD'), "ge"));
    this.setState({ filters: filters });
  }

  private handleFilterChanged = (index: number, newFilter: NcSingleDateFilter) => {
    const filters: INcFilterCollection = this.state.filters;
    filters.items[index] = newFilter;
    this.setState({ filters: filters });
  }

  public render(): React.ReactElement<INcFilterPaneProps> {
    let index: number = 0;
    const singleDateFilters = this.state.filters.items.filter(i => i instanceof NcSingleDateFilter).map(i => {
      let dateFilter = i as NcSingleDateFilter;
      let id = index++;
      return (
        <NcSingleDateFilterComponent key={id} id={id} dateFilter={dateFilter}
        onFilterChanged={this.handleFilterChanged} ></NcSingleDateFilterComponent>
      );
    });
    return (
      <div className={styles.ncFilterPane}>
        <input value={this.state.newFilterName} onChange={(e) => this.setState
          ({ newFilterName: e.target.value })} /><button onClick={this.handleNewDateFilter}>new Date Filter</button>
        {singleDateFilters}
        <button onClick={this.handleApplyNewFilter}>Apply</button>
      </div>
    );
  }
}
`;
