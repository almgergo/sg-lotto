import {Component} from '@angular/core';
import {AuthService} from "@services/auth.service";
import {Panel} from "../game-panel/game-panel.component";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  showSummary = false

  panels: Panel[] = [
    {index: 1, selection: []},
    {index: 2, selection: []},
    {index: 3, selection: []},
    {index: 4, selection: []},
  ]

  lockedInPanels: Panel[] = []

  constructor(private authService: AuthService) {
  }

  onPlay() {
    this.lockedInPanels = this.panels.map(panel => ({
      index: panel.index,
      selection: [...panel.selection].sort((v1, v2) => v1 - v2)
    }))
    this.showSummary = true
  }

  onSignOut() {
    this.authService.signOut()
  }
}
