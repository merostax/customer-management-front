// hero.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroService, Hero } from './hero.service';
import { provideHttpClient } from '@angular/common/http';

describe('HeroService', () => {
    let service: HeroService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HeroService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        service = TestBed.inject(HeroService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should return expected heroes (HttpClient called once)', () => {
        const expectedHeroes: Hero[] = [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
        ];

        service.getHeroes().subscribe((heroes) => {
            expect(heroes).toEqual(expectedHeroes);
        });

        const req = httpMock.expectOne('api/heroes');
        expect(req.request.method).toBe('GET');
        req.flush(expectedHeroes);
    });

    it('should return an error when the server returns a 404', () => {
        const errorMessage = '404 error';

        service.getHeroes().subscribe({
            next: () => fail('expected an error, not heroes'),
            error: (error) => {
                expect(error.status).toBe(404);
                expect(error.error).toContain(errorMessage);
            },
        });

        const req = httpMock.expectOne('api/heroes');
        req.flush(errorMessage);
    });
});
