import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RetrievePokemonService } from '../../services/retrieve-pokemon-service/retrieve-pokemon.service';
import { UtilitiesService } from '../../services/utilities-service/utilities.service';
import { ViewportScroller } from '@angular/common';

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
    canScroll: boolean = true;
    shouldLoadPreviousData: boolean;

    constructor(
        private retrievePokemonService: RetrievePokemonService,
        private utilitiesService: UtilitiesService,
        private viewPortScroller: ViewportScroller
    ) { }

    displayPokemon() {
        if (this.pokemonList.length < 898) {
            this.retrievePokemonService.getPokemonListForHome(this.shouldLoadPreviousData).then((res: any) => {
                this.pokemonList = res;
                this.showList = Promise.resolve(true);
                this.canScroll = true;
                this.shouldLoadPreviousData = false;
            });
        }
    }

    ngOnInit() {
        this.shouldLoadPreviousData = this.retrievePokemonService.getLoadedPokemonLength() > 0;
        this.displayPokemon();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.viewPortScroller.scrollToPosition([0,this.utilitiesService.getHomeScrollPosition()]);
        }, 10);
    }

    ngOnDestroy() {
        this.shouldLoadPreviousData = false;
    }
}
