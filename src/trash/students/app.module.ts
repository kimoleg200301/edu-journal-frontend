import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../../app/app.component';
import { AppRouting } from '../../app/app.routes';

@NgModule({
  imports: [BrowserModule, AppRouting, AppComponent],
  providers: []
})
export class AppModule {}
