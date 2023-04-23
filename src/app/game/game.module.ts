import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {GamePanelComponent} from './game-panel/game-panel.component';
import {GamePageComponent} from './game-page/game-page.component';
import {GameService} from "@services/game.service";
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PanelSummaryPipe} from "@pipes/panel-summary.pipe";

const routes: Routes = [{path: '', component: GamePageComponent}]

@NgModule({
  declarations: [
    GamePanelComponent,
    GamePageComponent,
    PanelSummaryPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule
  ],
  providers: [GameService]
})
export class GameModule {
}
