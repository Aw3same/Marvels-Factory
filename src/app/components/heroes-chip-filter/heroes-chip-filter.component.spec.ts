import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeroesChipFilterComponent } from './heroes-chip-filter.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'


describe('HeroesChipFilterComponent', () => {
  let component: HeroesChipFilterComponent
  let fixture: ComponentFixture<HeroesChipFilterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroesChipFilterComponent,
        NoopAnimationsModule
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(HeroesChipFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
