import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetrievePokemonService } from 'src/services/retrieve-pokemon-service/retrieve-pokemon.service';
import { UtilitiesService } from 'src/services/utilities-service/utilities.service';

interface PokemonDetails {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: PokemonSprites;
}

interface PokemonType {
    type: {
        name: string;
        url: string;
    }
}

interface PokemonSprites {
    front_default: string;
    front_shiny: string;
}

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
    pokemonName: string;
    pokemon: PokemonDetails;
    showInfo: Promise<boolean>;
    pokemonNormalSpriteURL: string;
    pokemonShinySpriteURL: string;
    pokemonNormalFemaleSpriteURL: string;
    pokemonShinyFemaleSpriteURL: string;
    hasGenderDifferences = true;
    male = true;
    female = false;

    constructor(
        private router: Router,
        private retrievePokemonService: RetrievePokemonService,
        private utilities: UtilitiesService
    ) {}

    ngOnInit() {
        this.pokemonName = this.router.url.substring(this.router.url.indexOf('pokemon-details/') + ('pokemon-details/').length, this.router.url.length);
        this.retrievePokemonService.getPokemon(this.pokemonName).subscribe((_pokemon: any) => {
            this.pokemon = {
                id: _pokemon.id,
                name: _pokemon.name,
                types: _pokemon.types,
                sprites: _pokemon.sprites
            } as PokemonDetails;
            this.pokemonNormalSpriteURL = this.utilities.resolveImgUrl(_pokemon.id, false);
            this.pokemonShinySpriteURL = this.utilities.resolveImgUrl(_pokemon.id, true);
            this.pokemonNormalFemaleSpriteURL = this.utilities.resolveImgUrl(_pokemon.id, false, 'F');
            this.pokemonShinyFemaleSpriteURL = this.utilities.resolveImgUrl(_pokemon.id, true, 'F');
            this.showInfo = Promise.resolve(true);
        });
        this.retrievePokemonService.getPokemonSpeciesInfo(this.pokemonName).subscribe((res: any) => {
            this.hasGenderDifferences = res.has_gender_differences;
        });
    }

    updateGender(gender: string) {
        if (gender == 'male') {
            this.male = true;
            this.female = false;
        } else {
            this.female = true;
            this.male = false;
        }
    }
}
