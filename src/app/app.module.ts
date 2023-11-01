import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { PokemonEffects } from './store/effects';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { PokemonListElementComponent } from './components/pokemon-list-element/pokemon-list-element.component';
import { PokemonListPageComponent } from './pages/pokemon-list-page/pokemon-list-page.component';
import { PokemonDetailPageComponent } from './pages/pokemon-detail-page/pokemon-detail-page.component';
import { DivideByTenPipe } from './pipes/divide-by-ten.pipe';
import { TypePillComponent } from './components/type-pill/type-pill.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    LoadingIndicatorComponent,
    PokemonListElementComponent,
    PokemonListPageComponent,
    PokemonDetailPageComponent,
    DivideByTenPipe,
    TypePillComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PokemonEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
