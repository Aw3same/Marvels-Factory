import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Hero } from '../types/hero'
import { Observable, catchError, of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient)
  heroesUrl = './assets/wikipedia_marvel_data.json'

  constructor() {}

  getHeroes(): Observable<Hero[]> {
    const heroes = localStorage.getItem('storedHeroes')
    if (heroes) {
      return new Observable(observer => {
        observer.next(JSON.parse(heroes))
        observer.complete()
      })
    } else {
      return this.http.get<Hero[]>(this.heroesUrl).pipe(
        tap(heroes => {
          localStorage.setItem('storedHeroes', JSON.stringify(heroes)) // we set in the first call the heroes in the local storage
        }),
        catchError(error => {
          console.error('Error fetching heroes:', error)
          return of([])
        })
      )
    }
  }

  addHero(hero: Hero): Observable<Hero> {
    const storedHeroes = JSON.parse(
      localStorage.getItem('storedHeroes')!
    ) as Hero[]
    storedHeroes.push(hero)
    localStorage.setItem('storedHeroes', JSON.stringify(storedHeroes))
    return new Observable(observer => {
      observer.next(hero)
      observer.complete()
    })
  }

  getHeroByName(name: string): Observable<Hero | undefined> {
    const heroes = JSON.parse(localStorage.getItem('storedHeroes')!) as Hero[]
    const hero = heroes.find((h: Hero) => h.nameLabel === name)
    return new Observable(observer => {
      observer.next(hero)
      observer.complete()
    })
  }

  deleteHeroByName(name: string): Observable<boolean> {
    let heroes = JSON.parse(localStorage.getItem('storedHeroes')!) as Hero[]
    const initialLength = heroes.length
    heroes = heroes.filter((h: Hero) => h.nameLabel !== name)
    localStorage.setItem('storedHeroes', JSON.stringify(heroes))
    return of(heroes.length !== initialLength).pipe(
      catchError(error => {
        console.error('Error deleting hero:', error)
        return of(false)
      })
    )
  }
}
