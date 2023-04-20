import {Pipe, PipeTransform} from "@angular/core";
import {Panel} from "../app/game/game-panel/game-panel.component";
import {PLAY_SELECTION_SIZE} from "@util/constants";

@Pipe({name: 'panelSummary'})
export class PanelSummaryPipe implements PipeTransform {
  transform(panel: Panel): any {
    if (panel.selection.length === 0) {
      return `<b>Panel ${panel.index}</b>: empty`
    } else if (panel.selection.length < PLAY_SELECTION_SIZE - 1) {
      return `<b>Panel ${panel.index}</b>: Error: ${PLAY_SELECTION_SIZE - panel.selection.length} marks are missing`
    } else if (panel.selection.length === PLAY_SELECTION_SIZE - 1) {
      return `<b>Panel ${panel.index}</b>: Error: ${PLAY_SELECTION_SIZE - panel.selection.length} mark is missing`
    } else if (panel.selection.length === PLAY_SELECTION_SIZE) {
      return `<b>Panel ${panel.index}</b>: ${panel.selection.join(', ')}`
    } else if (panel.selection.length === PLAY_SELECTION_SIZE + 1) {
      return `<b>Panel ${panel.index}</b>: Error: Please remove ${panel.selection.length - PLAY_SELECTION_SIZE} mark`
    } else {
      return `<b>Panel ${panel.index}</b>: Error: Please remove ${panel.selection.length - PLAY_SELECTION_SIZE} marks`
    }
  }
}
