import { Component, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeroesService } from './services/heroes.service'
import { HttpClientModule } from '@angular/common/http'
import { Hero } from './types/hero'
import { HeroesTableComponent } from './components/heroes-table/heroes-table.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeroesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HeroesService],
})
export class AppComponent implements OnInit {
  title = 'The Marvels Factory'
  year = new Date().getFullYear()
  heroesService = inject(HeroesService)

  heroes: Hero[] = []

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
    })
  }
}
