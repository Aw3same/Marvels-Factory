import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import { HeroesService } from './heroes.service'
import { Hero } from '../types/hero'
import { catchError, of } from 'rxjs'

const localStorageMock = (() => {
  let store: { [key: string]: string } = {}

  return {
    getItem(key: string): string | null {
      return store[key] || null
    },
    setItem(key: string, value: string): void {
      store[key] = value
    },
    removeItem(key: string): void {
      delete store[key]
    },
    clear(): void {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('HeroesService', () => {
  let service: HeroesService
  let httpTestingController: HttpTestingController
  let mockHeroes: Hero[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    })

    service = TestBed.inject(HeroesService)
    httpTestingController = TestBed.inject(HttpTestingController)

    mockHeroes = [
      {
        nameLabel: 'Iron Man',
        genderLabel: 'Male',
        citizenshipLabel: 'American',
        skillsLabel: 'Tech Genius, Engineer',
        occupationLabel: 'Billionaire Industrialist',
        memberOfLabel: 'Avengers',
        creatorLabel: 'Stan Lee, Jack Kirby, Larry Lieber, Don Heck',
      },
      {
        nameLabel: 'Captain America',
        genderLabel: 'Male',
        citizenshipLabel: 'American',
        skillsLabel: 'Peak Human Strength, Agility, Durability',
        occupationLabel: 'Soldier',
        memberOfLabel: 'Avengers',
        creatorLabel: 'Joe Simon, Jack Kirby',
      },
    ]
  })

  afterEach(() => {
    httpTestingController.verify() // Verify that no requests are outstanding
    localStorage.clear() // Clear local storage after each test
  })

  describe('#getHeroes', () => {
    it('#getHeroes should load heroes from the server and store them in localStorage', fakeAsync(() => {
      service.getHeroes().subscribe(heroes => {
        expect(heroes).toEqual(mockHeroes)
      })
      tick()

      const req = httpTestingController.expectOne(service.heroesUrl)
      expect(req.request.method).toEqual('GET')
      req.flush(mockHeroes)

      expect(localStorage.getItem('storedHeroes')).toEqual(
        JSON.stringify(mockHeroes)
      )
    }))

    it('#getHeroes should return heroes from localStorage if available', fakeAsync(() => {
      localStorage.setItem('storedHeroes', JSON.stringify(mockHeroes))

      service.getHeroes().subscribe(heroes => {
        expect(heroes).toEqual(mockHeroes)
      })

      tick()
    }))

    it('#getHeroes should return empty array if there is no data available', fakeAsync(() => {
      const expectedError = new ErrorEvent('Network error', {
        message: 'Error message',
      })
      localStorage.removeItem('storedHeroes')

      const heroes$ = service.getHeroes().pipe(
        catchError(err => {
          // Assert
          expect(err).toEqual(expectedError)
          return of([])
        })
      )
      // Assert
      heroes$.subscribe(heroes => {
        expect(heroes).toEqual([])
      })

      const req = httpTestingController.expectOne(service.heroesUrl)
      req.flush(mockHeroes, { status: 500, statusText: 'Fake error' })

      tick()
    }))
  })

  describe('#addHero', () => {
    it('#addHero should add a hero to localStorage and return the added hero', fakeAsync(() => {
      // Arrange
      const initialHeroes: Hero[] = [
        {
          nameLabel: 'Iron Man',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Tech Genius, Engineer',
          occupationLabel: 'Billionaire Industrialist',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Stan Lee, Jack Kirby, Larry Lieber, Don Heck',
        },
        {
          nameLabel: 'Captain America',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Peak Human Strength, Agility, Durability',
          occupationLabel: 'Soldier',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Joe Simon, Jack Kirby',
        },
      ]

      localStorage.setItem('storedHeroes', JSON.stringify(initialHeroes))

      const newHero: Hero = {
        nameLabel: 'Thor',
        genderLabel: 'Male',
        citizenshipLabel: 'Asgardian',
        skillsLabel: 'God of Thunder, Master Combatant',
        occupationLabel: 'God',
        memberOfLabel: 'Avengers',
        creatorLabel: 'Stan Lee, Jack Kirby',
      }

      // Act
      service.addHero(newHero).subscribe(hero => {
        expect(hero).toEqual(newHero)
      })
      tick()

      const updatedHeroes = JSON.parse(
        localStorage.getItem('storedHeroes')!
      ) as Hero[]
      expect(updatedHeroes).toContainEqual(newHero)
    }))
  })

  describe('#getHeroByName', () => {
    it('#getHeroByName should get a hero by name from localStorage', () => {
      // Arrange
      const heroes: Hero[] = [
        {
          nameLabel: 'Iron Man',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Tech Genius, Engineer',
          occupationLabel: 'Billionaire Industrialist',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Stan Lee, Jack Kirby, Larry Lieber, Don Heck',
        },
        {
          nameLabel: 'Captain America',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Peak Human Strength, Agility, Durability',
          occupationLabel: 'Soldier',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Joe Simon, Jack Kirby',
        },
      ]

      localStorage.setItem('storedHeroes', JSON.stringify(heroes))

      const heroName = 'Iron Man'

      // Act
      const hero$ = service.getHeroByName(heroName)

      // Assert
      hero$.subscribe(hero => {
        expect(hero?.nameLabel).toEqual(heroName)
      })
    })
  })

  describe('#deleteHeroByName', () => {
    it('#deleteHeroByName should delete a hero by name from localStorage', () => {
      // Arrange
      const heroes: Hero[] = [
        {
          nameLabel: 'Iron Man',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Tech Genius, Engineer',
          occupationLabel: 'Billionaire Industrialist',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Stan Lee, Jack Kirby, Larry Lieber, Don Heck',
        },
        {
          nameLabel: 'Captain America',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Peak Human Strength, Agility, Durability',
          occupationLabel: 'Soldier',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Joe Simon, Jack Kirby',
        },
      ]

      localStorage.setItem('storedHeroes', JSON.stringify(heroes))

      const heroNameToDelete = 'Iron Man'

      // Act
      const deleteResult$ = service.deleteHeroByName(heroNameToDelete)

      // Assert
      deleteResult$.subscribe(result => {
        expect(result).toBe(true)

        const remainingHeroes = JSON.parse(
          localStorage.getItem('storedHeroes')!
        ) as Hero[]
        const deletedHero = remainingHeroes.find(
          h => h.nameLabel === heroNameToDelete
        )
        expect(deletedHero).toBeUndefined()
      })
    })

    it('should return false if there is an error deleting a hero', fakeAsync(() => {

      const expectedError = new ErrorEvent('Hero not found', {
        message: 'Hero not found',
      })
      // Arrange
      const heroes: Hero[] = [
        {
          nameLabel: 'Iron Man',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Tech Genius, Engineer',
          occupationLabel: 'Billionaire Industrialist',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Stan Lee, Jack Kirby, Larry Lieber, Don Heck',
        },
        {
          nameLabel: 'Captain America',
          genderLabel: 'Male',
          citizenshipLabel: 'American',
          skillsLabel: 'Peak Human Strength, Agility, Durability',
          occupationLabel: 'Soldier',
          memberOfLabel: 'Avengers',
          creatorLabel: 'Joe Simon, Jack Kirby',
        },
      ]

      localStorage.setItem('storedHeroes', JSON.stringify(heroes))

      let reqResult: boolean | undefined

      service.deleteHeroByName('Hero that does not exist').subscribe(result => {
        reqResult = result
      })
      
      tick()
      expect(reqResult).toBe(false)
    }))
  })
})
