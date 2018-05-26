import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { LayoutModule } from "./layout/layout.module";
import { AuthModule } from "./auth/auth.module";
import { AppRoutes } from "./app-routing.module";
import { StorageModule } from "./storage/storage.module";
import { reducers, initialContentState } from "./store/reducers";
import { TransactionsEffects } from "./store/effects/transactions.effect";

import { AppComponent } from "./app/app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([TransactionsEffects]),
    StoreModule.forRoot(reducers, { initialState: initialContentState }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AppRoutes,
    AuthModule,
    LayoutModule,
    StorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
