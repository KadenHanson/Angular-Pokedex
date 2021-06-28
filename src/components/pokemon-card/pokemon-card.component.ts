import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/services/utilities-service/utilities.service';

@Component({
    selector: 'pokemon-card',
    templateUrl: './pokemon-card.component.html',
    styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
    @Input() pokemon;
    showSecondType: boolean;
    backgroundImage: string;

    constructor(private utilities: UtilitiesService) {
        this.showSecondType;
    }

    ngOnInit() {
        this.backgroundImage = this.utilities.resolveImgUrl(this.pokemon.dexNumber, false);
    }

}
