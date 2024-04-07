import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import { HeroesService } from './heroes.service'
import { Hero } from '../types/hero'

describe('HeroesService', () => {
  let service: HeroesService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    })

    service = TestBed.inject(HeroesService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    // Verify no outstanding requests
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#getHeroes', () => {
    let mockHeroes: Hero[]

    beforeEach(() => {
      mockHeroes = [
        {
          name: 'Iron Man',
          weight: '225 lbs',
          height: '6\'1"',
          age: 45,
          birth: 'May 4, 1970',
          powers: ['technological genius', 'advanced armor', 'flight'],
          description:
            'Tony Stark, a genius, billionaire, playboy, and philanthropist, becomes Iron Man to fight evil and protect the world.',
        },
        {
          name: 'Spider-Man',
          weight: '167 lbs',
          height: '5\'10"',
          age: 20,
          birth: 'August 10, 2004',
          powers: ['spider-sense', 'superhuman strength', 'agility'],
          description:
            'Peter Parker, a high school student, gains spider-like abilities after being bitten by a radioactive spider and fights crime as Spider-Man.',
        },
        {
          name: 'Captain America',
          weight: '220 lbs',
          height: '6\'2"',
          age: 100,
          birth: 'July 4, 1920',
          powers: ['superhuman strength', 'agility', 'indestructible shield'],
          description:
            'Steve Rogers, a super-soldier enhanced with the super-soldier serum, leads the Avengers as Captain America.',
        },
      ]
    })

    it('#getHeroes should return expected heroes (called once)', () => {
      service.getHeroes().subscribe(heroes => {
        expect(heroes).toEqual(mockHeroes)
      })

      const req = httpTestingController.expectOne('./assets/heroes.json') // Assuming heroesUrl is set
      expect(req.request.method).toEqual('GET')

      req.flush(mockHeroes) // Respond with mock data
    })

    it('#getHeroes should be OK returning no heroes', () => {
      service.getHeroes().subscribe(heroes => {
        expect(heroes.length).toEqual(0)
      })

      const req = httpTestingController.expectOne('./assets/heroes.json')
      expect(req.request.method).toEqual('GET')

      req.flush([]) // Respond with empty array
    })

    it('#getHeroes should handle error (404)', () => {
      const errorMsg = 'Mock Http failure'

      service.getHeroes().subscribe({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: _heroes => fail('expected an error, not heroes'),
        error: error => expect(error.message).toEqual(errorMsg),
      })

      const req = httpTestingController.expectOne('./assets/heroes.json')
      expect(req.request.method).toEqual('GET')

      req.flush([], { status: 404, statusText: errorMsg })
    })
  })

  describe('#addHero', () => {
    let mockHero: Hero

    beforeEach(() => {
      mockHero = {
        id: 10,
        name: 'Super Angel',
        weight: '150 lbs',
        height: '5\'5"',
        age: 32,
        birth: 'January 1, 1991',
        powers: ['flight', 'healing', 'teleportation'],
        description:
          'A superhero with the power of flight, healing, and teleportation.',
      }
    })

    it('should add a new hero', () => {
      service.addHero(mockHero).subscribe(hero => {
        expect(hero).toEqual(mockHero)
      })

      const req = httpTestingController.expectOne(service.heroesUrl)
      expect(req.request.method).toEqual('POST')
      expect(req.request.body).toEqual(mockHero)

      req.flush(mockHero) // Respond with the added hero
    })

    it('should handle error (400)', () => {
      const errorMsg = 'Mock Http failure'

      service.addHero(mockHero).subscribe({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: _hero => fail('expected an error, not hero'),
        error: error => expect(error.message).toEqual(errorMsg),
      })

      const req = httpTestingController.expectOne(service.heroesUrl)
      expect(req.request.method).toEqual('POST')
      expect(req.request.body).toEqual(mockHero)

      req.flush({}, { status: 400, statusText: errorMsg })
    })
  })
})
