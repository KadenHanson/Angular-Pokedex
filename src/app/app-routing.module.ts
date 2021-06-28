import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { PokemonDetailsComponent } from 'src/pages/pokemon-details/pokemon-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pokemon-details/:name', component: PokemonDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
