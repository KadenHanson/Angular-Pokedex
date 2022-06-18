import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {
    baseSpritURL: string = '../../assets/sprites/pokemon_icon_';
    homeScrollPosition = 0;

    constructor() {
    }

    public resolveDexNumber(url: string): string {
        let dexNumber;
        dexNumber = url.match(/(?<=\/)([0-9]?[0-9]?[0-9])(?=\/)/g);

        return dexNumber[0];
    }

    public resolveImgUrl(dexNumber: string | number, shiny: boolean, gender?: string): string {
        return `${this.baseSpritURL}${dexNumber.toString().length == 1 ? '00' : ''}${dexNumber.toString().length == 2 ? '0' : ''}${dexNumber}_${gender == 'F' ? '01' : '00'}${shiny ? '_shiny' : ''}.png`;
    }

    public getHomeScrollPosition() {
        return this.homeScrollPosition;
    }

    public setHomeScrollPosition(position: number) {
        this.homeScrollPosition = position;
    }
}
