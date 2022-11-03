import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlavorTextEntry, PokemonDetails } from 'src/models/pokemon/pokemon-details.model';
import { RetrievePokemonService } from 'src/services/retrieve-pokemon-service/retrieve-pokemon.service';
import { UtilitiesService } from 'src/services/utilities-service/utilities.service';

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
    selectedTextIndex = 0;
    selectedFlavorText = '';

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
                sprites: _pokemon.sprites,
                flavorTexts: []
            } as PokemonDetails;
            this.pokemonNormalSpriteURL = this.utilities.resolveImgUrl(_pokemon.id, false);
            this.pokemonShinySpriteURL = this.utilities.resolveImgUrl(_pokemon.id, true);
            this.pokemonNormalFemaleSpriteURL = this.utilities.resolveImgUrl(_pokemon.id, false, 'F');
            this.pokemonShinyFemaleSpriteURL = this.utilities.resolveImgUrl(_pokemon.id, true, 'F');
        });
        this.retrievePokemonService.getPokemonSpeciesInfo(this.pokemonName).subscribe((res: any) => {
            this.hasGenderDifferences = res.has_gender_differences;
            this.pokemon.flavorTexts = this.getFlavorTextEntries(this.mapEntries(res.flavor_text_entries));
            this.showInfo = Promise.resolve(true);
        });
    }

    mapEntries(entries: object[]) {
        var mappedEntries: FlavorTextEntry[] = [];
        entries.map((e: any) => {
            mappedEntries.push({
                flavorText: e.flavor_text,
                language: e.language,
                version: e.version
            } as FlavorTextEntry)
        });
        return mappedEntries;
    }

    getFlavorTextEntries(entries: FlavorTextEntry[]) {
        if (entries !== undefined) {
            var englishEntries: FlavorTextEntry[] = entries.filter((x: FlavorTextEntry) => x.language.name === "en");
            return englishEntries;
        } else {
            return [];
        }
        
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

    switchText(entry: number) {
        this.selectedTextIndex = entry;
        this.selectedFlavorText = this.pokemon.flavorTexts[entry].flavorText.replace(/\n/g, ' ').replace(/\f/g, ' ');
    }

    fixVersionName(version: string) {
        var fixedName = version.replace(/-/g, ' ');
        fixedName = fixedName.split(' ')
            .map((t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase())
            .join(' ');
        return fixedName;
    }
}
