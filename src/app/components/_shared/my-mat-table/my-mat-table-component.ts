import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MyColumnDefs } from '../../../utils/types/my-column-def';

@Component({
  selector: 'my-mat-table',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule],
  templateUrl: './my-mat-table-component.html',
})
export class MyMatTableComponent<TDataSourceItem> {
  dataSource = input.required<TDataSourceItem[]>();
  columnDefs = input.required<MyColumnDefs<TDataSourceItem>>();

  protected _ToString = String;

  displayedColumns = computed(() =>
    this.columnDefs().map((def) => def.columnId),
  );
}
