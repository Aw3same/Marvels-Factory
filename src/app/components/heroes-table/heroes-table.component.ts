import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Hero } from '../../types/hero'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatInputModule } from '@angular/material/input'
import { HeroesChipFilterComponent } from '../heroes-chip-filter/heroes-chip-filter.component'
import { MatDialog } from '@angular/material/dialog'
import { ModalHeroInfoComponent } from '../modal-hero-info/modal-hero-info.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'heroes-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HeroesChipFilterComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './heroes-table.component.html',
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
  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.dataSource.filterPredicate = this.filterHeroesByNames
  }


  openHeroInformation(row: Hero): void {
    this.dialog.open(ModalHeroInfoComponent, {
      data: row,   
    })
  }
  openCreateHeroDialog(): void {
  }

  filterHeroes(heroes: string[]) {
    this.dataSource.filter = heroes.join(' ')    
  }

  private filterHeroesByNames(row: Hero, filter: string): boolean {
    const columnName = row.nameLabel.toLowerCase()

    const searchTerms = filter.toLowerCase().split(' ')
    return searchTerms.some(term => columnName.includes(term))
  }
}
