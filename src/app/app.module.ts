import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { githubUserReducer } from './store/reducers/user.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ApiModule, BASE_PATH } from 'src/api';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      allSearchedUser: githubUserReducer,
    }),
    SharedModule,
    ApiModule,    
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: environment.API_ENDPOINT
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
