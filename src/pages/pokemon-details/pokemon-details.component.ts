import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetrievePokemonService } from 'src/services/retrieve-pokemon-service/retrieve-pokemon.service';
import { UtilitiesService } from 'src/services/utilities-service/utilities.service';

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
    pokemonName: string;
    pokemon: object;
    showInfo: Promise<boolean>;
    pokemonNormalSpriteURL: string;
    pokemonShinySpriteURL: string;
    pokemonNormalFemaleSpriteURL: string;
    pokemonShinyFemaleSpriteURL: string;

    constructor(private router: Router, private retrievePokemonService: RetrievePokemonService, private utilities: UtilitiesService) { }

    ngOnInit() {
        this.pokemonName = this.router.url.substring(this.router.url.indexOf('pokemon-details/') + ('pokemon-details/').length, this.router.url.length);
        this.retrievePokemonService.getPokemon(this.pokemonName).subscribe(_pokemon => {
            this.pokemon = _pokemon;
            console.log(_pokemon);
            this.pokemonNormalSpriteURL = this.utilities.resolveImgUrl(_pokemon.id, false);
            this.pokemonShinySpriteURL = this.utilities.resolveImgUrl(_pokemon.id, true);
            console.log(this.pokemonNormalSpriteURL);
            this.showInfo = Promise.resolve(true);
        });
    }
}
