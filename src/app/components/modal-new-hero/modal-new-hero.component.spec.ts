import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ModalNewHeroComponent } from './modal-new-hero.component'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { HttpClientModule } from '@angular/common/http'
import { HeroesService } from '../../services/heroes.service'
import { HeroFormComponent } from '../hero-form/hero-form.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('ModalNewHeroComponent', () => {
  let component: ModalNewHeroComponent
  let fixture: ComponentFixture<ModalNewHeroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalNewHeroComponent,
        MatDialogModule,
        MatButtonModule,
        HeroFormComponent,
        HttpClientModule,
        NoopAnimationsModule
      ],
      providers: [
        HeroesService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ModalNewHeroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
