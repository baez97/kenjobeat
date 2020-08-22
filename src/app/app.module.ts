import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSearchComponent } from '@nebular/theme';
import { NbSearchModule } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { GlobalSearchBarComponent } from './components/global-search-bar/global-search-bar.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { AddDropdownComponent } from './components/add-dropdown/add-dropdown.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { AlbumModalComponent } from './components/album-modal/album-modal.component';
import { ArtistModalComponent } from './components/artist-modal/artist-modal.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumListItemComponent } from './components/album-list-item/album-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    NavbarComponent,
    GlobalSearchBarComponent,
    ListItemComponent,
    AddDropdownComponent,
    AddButtonComponent,
    ModalComponent,
    AlbumModalComponent,
    ArtistModalComponent,
    AlbumListComponent,
    AlbumListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSearchModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
