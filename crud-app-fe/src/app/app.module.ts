import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { materialImports } from './util/material.imports';
import { HttpClientModule } from '@angular/common/http';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    EmpAddEditComponent,
    DeletePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialImports,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
