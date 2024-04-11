import { Component, Inject, inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Hero } from '../../types/hero'
import { HttpClientModule } from '@angular/common/http'
import { HeroesService } from '../../services/heroes.service'
import { HeroFormComponent } from '../hero-form/hero-form.component'

@Component({
  selector: 'modal-update-hero',
  standalone: true,
  imports: [HeroFormComponent, HttpClientModule],
  providers: [HeroesService],
  templateUrl: './modal-update-hero.component.html',
  styleUrl: './modal-update-hero.component.css',
})
export class ModalUpdateHeroComponent {
  heroService = inject(HeroesService)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Hero,
    public dialogRef: MatDialogRef<ModalUpdateHeroComponent>
  ) {}

  updateHero(hero: Hero) {
    this.heroService.updateHero(this.data, hero).subscribe(result => {
      if (!result) {
        console.error('Error updating hero')
        return
      }
      this.dialogRef.close([result, this.data])
    })
  }
}
