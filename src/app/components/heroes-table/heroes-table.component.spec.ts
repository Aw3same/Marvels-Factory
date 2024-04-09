import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeroesTableComponent } from './heroes-table.component'
import { HeroesChipFilterComponent } from '../heroes-chip-filter/heroes-chip-filter.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('HeroesTableComponent', () => {
  let component: HeroesTableComponent
  let fixture: ComponentFixture<HeroesTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroesTableComponent,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        HeroesChipFilterComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(HeroesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
