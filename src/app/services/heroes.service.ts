import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Hero } from '../types/hero'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient)
  heroesUrl = './assets/heroes.json'

  constructor(httpClient: HttpClient) {
    this.http = httpClient
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero)
  }
}
