import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListPageComponent } from './pages/pokemon-list-page/pokemon-list-page.component';
import { PokemonDetailPageComponent } from './pages/pokemon-detail-page/pokemon-detail-page.component';

const routes: Routes = [
  { path: '', component: PokemonListPageComponent },
  { path: 'pokemon/:id', component: PokemonDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
