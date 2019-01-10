import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CardComponent } from './memory-game/card/card.component';
import { MemoryGameComponent } from './memory-game/memory-game/memory-game.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ShootComponent } from './shoot/shoot/shoot.component';
import { DynamicTargetComponent } from './shoot/dynamic-target/dynamic-target.component';

const appRoutes: Routes = [
  { path: 'memory', component: MemoryGameComponent },
  { path: 'shoot', component: ShootComponent },
  { path: '', redirectTo: '/shoot', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MemoryGameComponent,
    ShootComponent,
    DynamicTargetComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DynamicTargetComponent]
})
export class AppModule { }
