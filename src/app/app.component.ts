import { Component, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeroesService } from './services/heroes.service'
import { HttpClientModule } from '@angular/common/http'
import { Hero } from './types/hero'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HeroesService],
})
export class AppComponent implements OnInit {
  title = 'marvels-factory'

  heroesService = inject(HeroesService)

  heroes: Hero[] = []

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(heroes => {
      console.log(heroes)
      this.heroes = heroes
    })
  }
}
