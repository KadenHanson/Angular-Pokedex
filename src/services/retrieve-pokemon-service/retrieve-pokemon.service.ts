import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RetrievePokemonService {
    private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

    constructor(private http: HttpClient) {
    }

    getPokemon(selector: any): any {
        return this.http.get(`${this.baseUrl}${selector}`);
    }

    getPokemonList(offset: number): any {
        return this.http.get(`${this.baseUrl}?offset=${offset}&limit=50`);
    }
}
