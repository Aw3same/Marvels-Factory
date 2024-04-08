import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Hero } from '../types/hero'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatInputModule } from '@angular/material/input'
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

import {COMMA, ENTER} from '@angular/cdk/keycodes'
@Component({
  selector: 'heroes-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input
        matInput
        (keyup)="applyFilter($event)"
        placeholder="Ex. Thor"
        #input />
    </mat-form-field>
    <mat-form-field class="example-chip-list">
      <mat-label>Favorite Fruits</mat-label>
      <mat-chip-grid #chipGrid aria-label="Enter fruits">
        @for (fruit of fruits; track fruit) {
          <mat-chip-row
            (removed)="remove(fruit)"
            [editable]="true"
            (edited)="edit(fruit, $event)"
            [aria-description]="'press enter to edit ' + fruit.name">
            {{ fruit.name }}
            <button matChipRemove [attr.aria-label]="'remove ' + fruit.name">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        }
        <input
          placeholder="New fruit..."
          [matChipInputFor]="chipGrid"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          [matChipInputAddOnBlur]="addOnBlur"
          (matChipInputTokenEnd)="add($event)" />
      </mat-chip-grid>
    </mat-form-field>
    <div class="mat-elevation-z8 min-w-max">
      <table mat-table [dataSource]="dataSource" matSort>
        <ng-container matColumnDef="nameLabel">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="font-bold">
            Name
          </th>
          <td mat-cell *matCellDef="let element">{{ element.nameLabel }}</td>
        </ng-container>

        <ng-container matColumnDef="genderLabel">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="font-bold">
            Gender
          </th>
          <td mat-cell *matCellDef="let element">{{ element.genderLabel }}</td>
        </ng-container>

        <ng-container matColumnDef="citizenshipLabel">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="font-bold">
            Citizenship
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.citizenshipLabel }}
          </td>
        </ng-container>

        <ng-container matColumnDef="skillsLabel">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="font-bold">
            Skills
          </th>
          <td mat-cell *matCellDef="let element">{{ element.skillsLabel }}</td>
        </ng-container>

        <ng-container matColumnDef="occupationLabel">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="font-bold">
            Ocupattion
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.occupationLabel }}
          </td>
        </ng-container>

        <ng-container matColumnDef="memberOfLabel">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="font-bold">
            Member of
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.memberOfLabel }}
          </td>
        </ng-container>

        <ng-container matColumnDef="creatorLabel">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            class="font-bold">
            Creator
          </th>
          <td mat-cell *matCellDef="let element">{{ element.creatorLabel }}</td>
        </ng-container>

        <!-- Custom row definitions to be provided to the wrapper table. -->
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

        <!-- Row shown when there is no matching data that will be provided to the table. -->
        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell" colspan="4">There are no heroes ☹️</td>
        </tr>
      </table>
      <mat-paginator
        [pageSizeOptions]="[5, 10, 25, 100]"
        aria-label="Select page of users"></mat-paginator>
    </div>
  `,
  styleUrl: './heroes-table.component.css',
})
export class HeroesTableComponent implements AfterViewInit {
  @Input() set heroes(heroes: Hero[]) {
    this.dataSource.data = heroes
  }

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = [
    'nameLabel',
    'genderLabel',
    'citizenshipLabel',
    'skillsLabel',
    'occupationLabel',
    'memberOfLabel',
    'creatorLabel',
  ]
  dataSource = new MatTableDataSource<Hero>([])

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }
}
