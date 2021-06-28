import { Component, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [BrowserAnimationsModule]
})

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    pokemon: object[];

    constructor() {
        this.pokemon = [
            { name: 'Bulbasaur', type1: 'Grass', type2: 'Poison', dexNo: '1' },
            { name: 'Charmander', type1: 'Fire', type2: '', dexNo: '4' },
            { name: 'Squirtle', type1: 'Water', type2: '', dexNo: '7' },
            { name: 'Pidgey', type1: 'Normal', type2: 'Flying', dexNo: '16' },
            { name: 'Pikachu', type1: 'Electric', type2: '', dexNo: '25' }
        ];
    }
}
