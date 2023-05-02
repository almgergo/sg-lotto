import {Component, Input} from '@angular/core';
import {GameService} from "@services/game.service";
import {faShuffle, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {PLAY_COLUMN_SIZE, PLAY_ROW_SIZE} from "@util/constants";

export interface Panel {
  index: number
  selection: Array<number>
}

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss']
})
export class GamePanelComponent {
  @Input() panel: Panel

  rows: number[][]

  faTrashCan = faTrashCan
  faShuffle = faShuffle

  constructor(private gameService: GameService) {
    this.panel = {index: 0, selection: []}
    this.rows = Array.from({length: PLAY_COLUMN_SIZE}, (value, index) => this.getRow(index))
  }

  onRandomSelection = () => this.panel.selection = this.gameService.randomSelection(6)

  onClearSelection = () => this.panel.selection = []

  getRow = (start: number) => Array.from({length: PLAY_ROW_SIZE}, (value, index) => index + start * PLAY_ROW_SIZE + 1)

  isSelected = (number: number) => this.panel.selection.indexOf(number) > -1

  onSelect = (number: number) => {
    const index = this.panel.selection.indexOf(number)
    if (index > -1) this.panel.selection.splice(index, 1)
    else this.panel.selection.push(number)
  }
}
