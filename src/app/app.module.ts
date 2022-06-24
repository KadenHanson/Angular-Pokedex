import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '../partials/navbar/navbar.component';
import { MatToolbar, MatCard, MatCardContent, MatCardTitle, MatCardHeader, MatCardSubtitle, MatGridList, MatGridTile, MatSpinner } from '@angular/material';
import { FooterComponent } from '../partials/footer/footer.component';
import { HomeComponent } from '../pages/home/home.component';
import { PokemonDetailsComponent } from '../pages/pokemon-details/pokemon-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule } from 'apollo-angular-link-http';
import {ScrollTracker} from './ScrollTracker.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MatToolbar,
        MatCard,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatCardContent,
        MatGridList,
        MatGridTile,
        MatSpinner,
        FooterComponent,
        HomeComponent,
        PokemonCardComponent,
        PokemonDetailsComponent,
        ScrollTracker
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        GraphQLModule,
        HttpClientModule,
        HttpLinkModule,
        FormsModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faMars,
            faVenus
        );
    }
}
