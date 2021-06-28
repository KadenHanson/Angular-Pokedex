import { TestBed } from '@angular/core/testing';

import { RetrievePokemonService } from './retrieve-pokemon.service';

describe('RetrievePokemonService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: RetrievePokemonService = TestBed.get(RetrievePokemonService);
        expect(service).toBeTruthy();
    });
});
