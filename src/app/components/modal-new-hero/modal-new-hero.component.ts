import { Component, inject } from '@angular/core'
import { HeroFormComponent } from '../hero-form/hero-form.component'
import { Hero } from '../../types/hero'
import { HeroesService } from '../../services/heroes.service'
import { HttpClientModule } from '@angular/common/http'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-modal-new-hero',
  standalone: true,
  imports: [HeroFormComponent, HttpClientModule],
  providers: [HeroesService],
  templateUrl: './modal-new-hero.component.html',
  styleUrl: './modal-new-hero.component.css',
})
export class ModalNewHeroComponent {
  heroService = inject(HeroesService)

  constructor(public dialogRef: MatDialogRef<ModalNewHeroComponent>) {}

  createNewHero(hero: Hero) {
    this.heroService.addHero(hero).subscribe(result => {
      if (!result) {
        console.error('Error creating hero')
        return
      }
      this.dialogRef.close(result)
    })
  }
}
