import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Hero } from '../../types/hero'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatInputModule } from '@angular/material/input'
import { HeroesChipFilterComponent } from '../heroes-chip-filter/heroes-chip-filter.component'

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
  ],
  templateUrl: './heroes-table.component.html',
  styleUrl: './heroes-table.component.css',
})
export class HeroesTableComponent implements AfterViewInit {
  @Input() set heroes(heroes: Hero[]) {
    this.dataSource.data = heroes
    this.heroeNames = heroes.map(hero => hero.nameLabel)
  }

  heroeNames: string[] = []


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

  filterHeroes(heroes: string[]) {
    console.log('Heroes to filter', heroes)
    console.log('Does the hero exists?', this.dataSource.data.filter(hero => heroes.includes(hero.nameLabel)))
  }
}
