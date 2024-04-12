import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core'
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
import { ModalNewHeroComponent } from '../modal-new-hero/modal-new-hero.component'
import { HeroesService } from '../../services/heroes.service'
import { HttpClientModule } from '@angular/common/http'
import { ModalUpdateHeroComponent } from '../modal-update-hero/modal-update-hero.component'
import { BarComponent } from '../charts/bar/bar.component'

import { ChartData } from '../../types/charts'
import { PieComponent } from '../charts/pie/pie.component'

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
    MatIconModule,
    HttpClientModule,
    BarComponent,
    PieComponent,
  ],
  providers: [HeroesService],
  templateUrl: './heroes-table.component.html',
  styleUrl: './heroes-table.component.css',
})
export class HeroesTableComponent implements AfterViewInit {
  @Input() set heroes(heroes: Hero[]) {
    this.dataSource.data = heroes

    this.generateChartData(heroes)
  }

  groupedNameChartData: ChartData[] = []
  groupedGenderChartData: ChartData[] = []
  groupedCitizenshipChartData: ChartData[] = []
  groupedSkillsChartData: ChartData[] = []
  groupedOccupationChartData: ChartData[] = []
  groupedMemberChartData: ChartData[] = []
  groupedCreatorChartData: ChartData[] = []
  numDistinctNames = 0
  numDistinctGenders = 0
  numDistinctCitizenships = 0
  numDistinctSkills = 0
  numDistinctOccupations = 0
  numDistinctMembers = 0
  numDistinctCreators = 0

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  dataColumns: string[] = [
    'nameLabel',
    'genderLabel',
    'citizenshipLabel',
    'skillsLabel',
    'occupationLabel',
    'memberOfLabel',
    'creatorLabel',
    'actions',
  ]

  chartColumns: string[] = [
    'nameLabel-chart',
    'genderLabel-chart',
    'citizenshipLabel-chart',
    'skillsLabel-chart',
    'occupationLabel-chart',
    'memberOfLabel-chart',
    'creatorLabel-chart',
  ]

  dataSource = new MatTableDataSource<Hero>([])
  heroesService = inject(HeroesService)
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
    const dialogRef = this.dialog.open(ModalNewHeroComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [result, ...this.dataSource.data]        
      }
    })
  }

  deleteHero(row: Hero): void {
    this.heroesService.deleteHeroByName(row.nameLabel).subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          hero => hero.nameLabel !== row.nameLabel
        )
      }
    })
  }

  updateHero(row: Hero): void {
    const dialogRef = this.dialog.open(ModalUpdateHeroComponent, {
      data: row,
    })

    dialogRef.afterClosed().subscribe(([updatedHero, prevHero]) => {
      if (updatedHero) {
        const prevData = this.dataSource.data

        const index = prevData.findIndex(
          hero => hero.nameLabel === prevHero.nameLabel
        )
        prevData[index] = updatedHero

        this.dataSource.data = prevData
      }
    })
  }

  filterHeroes(heroes: string[]) {
    this.dataSource.filter = heroes.join(' ')
  }

  private filterHeroesByNames(row: Hero, filter: string): boolean {
    const columnName = row.nameLabel.toLowerCase()

    const searchTerms = filter.toLowerCase().split(' ')
    return searchTerms.some(term => columnName.includes(term))
  }

  private countGroupedData(
    heroes: Hero[],
    labelKey: keyof Hero,
    chartDataArray: ChartData[]
  ): number {
    const groupedData: { [key: string]: number } = {}
    for (const hero of heroes) {
      const label = hero[labelKey]
      if (!groupedData[label]) {
        groupedData[label] = 1
      } else {
        groupedData[label]++
      }
    }

    for (const key of Object.keys(groupedData)) {
      const barChartData: ChartData = {
        key: key,
        value: groupedData[key],
      }
      chartDataArray.push(barChartData)
    }

    return Object.keys(groupedData).length
  }

  private generateChartData(heroes: Hero[]) {
    this.numDistinctNames = this.countGroupedData(
      heroes,
      'nameLabel',
      this.groupedNameChartData
    )
    this.numDistinctGenders = this.countGroupedData(
      heroes,
      'genderLabel',
      this.groupedGenderChartData
    )
    this.numDistinctCitizenships = this.countGroupedData(
      heroes,
      'citizenshipLabel',
      this.groupedCitizenshipChartData
    )
    this.numDistinctSkills = this.countGroupedData(
      heroes,
      'skillsLabel',
      this.groupedSkillsChartData
    )
    this.numDistinctOccupations = this.countGroupedData(
      heroes,
      'occupationLabel',
      this.groupedOccupationChartData
    )
    this.numDistinctMembers = this.countGroupedData(
      heroes,
      'memberOfLabel',
      this.groupedMemberChartData
    )
    this.numDistinctCreators = this.countGroupedData(
      heroes,
      'creatorLabel',
      this.groupedCreatorChartData
    )
  }
}
