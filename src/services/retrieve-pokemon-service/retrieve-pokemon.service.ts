import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../utilities-service/utilities.service';
import { Observable } from 'rxjs';

interface PokemonHomeData {
    name: string;
    url: string;
    dexNumber: string;
    types: [string, string];
}

@Injectable({
    providedIn: 'root'
})
export class RetrievePokemonService {
    private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';
    public offset: number = -50;
    public pokemonHomeResults = [];

    constructor(private http: HttpClient, private utilities: UtilitiesService) {
    }

    getPokemon(selector: any): any {
        return this.http.get(`${this.baseUrl}/${selector}`);
    }

    getAllPokemon() {
        return this.http.get(`${this.baseUrl}?limit=898`);
    }

    async getPokemonListForHome(loadPrevData: boolean): Promise<any> {
        if (!loadPrevData) {
            this.offset += 50;
            this.http.get(`${this.baseUrl}?offset=${this.offset}&limit=50`).subscribe((res) => {
                this.handlePokemonRequestData(res);
            });
        }
        return this.pokemonHomeResults;
    }

    handlePokemonRequestData(res: any) {
        const results = res.results;
        const pokemonResults = this.pokemonHomeResults;

        results.map((pokemonData: any) => {
            const newPokemonData: PokemonHomeData = {
                name: pokemonData.name,
                url: pokemonData.url,
                dexNumber: this.utilities.resolveDexNumber(pokemonData.url),
                types: ['', '']
            };

            pokemonResults.push(newPokemonData);
        });

        this.pokemonHomeResults = pokemonResults;
    }

    getLoadedPokemonLength() {
        return this.pokemonHomeResults.length;
    }

    getPokemonSpeciesInfo(pokemonName: string) {
        return this.http.get(`${this.baseUrl}-species/${pokemonName}`);
    }
}
