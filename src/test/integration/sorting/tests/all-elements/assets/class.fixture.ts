export const ClassFixture = 
`import { Component, OnInit } from '@angular/core';

import { GridOptions, RowNode } from 'ag-grid';
import * as moment from 'moment';

import { ToastService } from 'app/common/core-services/toast';
import { Employee, EmployeeService } from 'app/common/shared-domain/employees';
import { DateUtilities, JsObjUtilities } from 'app/common/utilities';

import { Employment } from '../../../common/models';
import { EmploymentService } from '../../../common/services';
import { WorkloadService } from '../../services';
import { GridBuilder } from './grid.builder';

@Component({
  selector: 'app-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.scss']
})
export class WorkloadComponent implements OnInit {
  public gridOptions: GridOptions;
  public selectedEmployee: Employee;
  public loadedEmployeeDisplayName: string;

  private gridData: Employment[] = [];
  private initialGridData: Employment[];

  constructor(
    private toastService: ToastService,
    private employmentService: EmploymentService,
    private employeeService: EmployeeService,
    private workloadService: WorkloadService) {
  }

  public async employeeSelected(employee: Employee): Promise<void> {
    this.selectedEmployee = employee;
  }

  public ngOnInit(): void {
    this.setLoadedEmployeeName();
    this.configureGrid();
  }

  public newWorkload(): void {
    const employeeId = this.selectedEmployee.id!;
    const employment = Employment.createNew(employeeId);

    this.gridData.push(employment);
    this.setGridDataIfReady();
    this.toastService.showInfoToast('Update the values in the selected row');

    if (this.gridOptions.api) {
      this.gridOptions.api.selectNode(this.gridOptions.api.getModel().getRow(0));
    }
  }

  public deleteWorkload(): void {
    const nodes = this.gridOptions.api!.getSelectedNodes();
    if (nodes.length > 0) {
      const workloadData = nodes.map(f => <Employment>f.data);
      for (const workload of workloadData) {
        const end = <Date>(JsObjUtilities.isNullOrUndefined(workload.endDate) ? DateUtilities.maxDate : workload.endDate);

        if (end > new Date()) {
          this.gridData = this.workloadService.deleteEmployments(this.gridData, [workload]);
          this.gridOptions.api!.removeItems(nodes);
          this.toastService.showSuccessToast('Successfully deleted items');
        } else {
          this.toastService.showInfoToast('You can only delete employments, which are active in the future');
        }
      }
    } else {
      this.toastService.showInfoToast('Nothing selected');
    }
  }

  public searchExecuted(): void {
    this.loadEmployments();
  }

  public saveData(): void {
    if (!this.workloadService.allWorkPercentValid(this.gridData)) {
      this.toastService.showErrorToast('Work percent can only be within 0 and 100');
      return;
    }

    if (!this.workloadService.allDateRangesValid(this.gridData)) {
      this.toastService.showErrorToast('Date ranges cannot overlap');
      return;
    }

    if (this.workloadService.allBeginDatesValid(this.gridData)) {
      this.toastService.showErrorToast('There are items where the End date is smaller than the Begin date');
      return;
    }

    const changed = this.workloadService.getEntitiesToSave(this.gridData, this.initialGridData);
    this.workloadService.saveChangedEntities(changed);
    this.toastService.showSuccessToast('Successfully saved items');
  }

  private async loadEmployments(): Promise<void> {
    if (JsObjUtilities.isNullOrUndefined(this.selectedEmployee)) {
      this.toastService.showErrorToast('No employee was selected');
      return;
    }

    const employments = await this.employmentService.getEmploymentsByEmployeeId(this.selectedEmployee.id!);
    this.gridData = employments;
    this.initialGridData = this.workloadService.copyEmploymentList(employments);
    this.setGridDataIfReady();
    this.setLoadedEmployeeName();
  }

  private setLoadedEmployeeName() {
    if (JsObjUtilities.isNullOrUndefined(this.selectedEmployee)) {
      this.loadedEmployeeDisplayName = 'No Employee loaded';
    } else {
      this.loadedEmployeeDisplayName = this.selectedEmployee.displayName!;
    }
  }

  private configureGrid(): void {
    const gridOptions = GridBuilder.createGridOptions();
    gridOptions.onGridReady = this.sizeColumnsIfReady.bind(this);
    gridOptions.onGridSizeChanged = this.sizeColumnsIfReady.bind(this);
    this.gridOptions = gridOptions;

    this.setGridDataIfReady();
  }

  private setGridDataIfReady(): void {
    if (!this.gridData) {
      return;
    }

    const items = this.workloadService.sortByDate(this.gridData);
    if (this.gridOptions) {
      if (this.gridOptions.api) {
        this.gridOptions.api.setRowData(items);
      } else {
        this.gridOptions.rowData = items;
      }
    }
  }

  private sizeColumnsIfReady(): void {
    if (this.gridOptions.api) {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }
}`;