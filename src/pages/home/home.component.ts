import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RetrievePokemonService } from '../../services/retrieve-pokemon-service/retrieve-pokemon.service';
import { UtilitiesService } from '../../services/utilities-service/utilities.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @Input() scrolled: any;
    @ViewChild('pokemonContainer', {static: false}) scrollContainer: ElementRef;
    @HostListener("window:scroll", [])
    onScroll(): void {
        if (!this.canScroll) return;
        let element = this.scrollContainer.nativeElement;
        if (window.innerHeight + window.pageYOffset >= element.clientHeight) {
            this.canScroll = false;
            this.displayPokemon();
        }
    }
    pokemonList: any = [];
    showList: Promise<boolean>;
    offset: number = 0;
    canScroll: boolean = true;

    constructor(private retrievePokemonService: RetrievePokemonService, private utilities: UtilitiesService) { }

    displayPokemon() {
        let currentOffset = this.offset;
        this.offset = this.offset + 50;

        this.retrievePokemonService.getPokemonList(currentOffset).subscribe(res => {
            const results = res.results;
            const pokemonResults = this.pokemonList;

            results.map(pokemonData => {
                const newPokemonData = {
                    name: pokemonData.name,
                    url: pokemonData.url,
                    dexNumber: this.utilities.resolveDexNumber(pokemonData.url),
                    types: ['', '']
                };

                pokemonResults.push(newPokemonData);
            });
            this.pokemonList = pokemonResults;
            this.showList = Promise.resolve(true);
            this.canScroll = true;
        });
    }

    ngOnInit() {
        this.displayPokemon();
    }
}
