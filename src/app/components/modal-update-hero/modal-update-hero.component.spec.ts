import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ModalUpdateHeroComponent } from './modal-update-hero.component'
import { HttpClientModule } from '@angular/common/http'
import { HeroesService } from '../../services/heroes.service'
import { HeroFormComponent } from '../hero-form/hero-form.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

describe('ModalUpdateHeroComponent', () => {
  let component: ModalUpdateHeroComponent
  let fixture: ComponentFixture<ModalUpdateHeroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        HeroesService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ModalUpdateHeroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
