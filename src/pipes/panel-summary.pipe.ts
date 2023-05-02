import {Pipe, PipeTransform} from "@angular/core";
import {Panel} from "../app/game/game-panel/game-panel.component";
import {PLAY_SELECTION_SIZE} from "@util/constants";

const conditions = [
  {max: 0, getMessage: () => 'empty',},
  {max: 4, getMessage: (panel: Panel) => `Error: ${PLAY_SELECTION_SIZE - panel.selection.length} marks are missing`,},
  {max: 5, getMessage: (panel: Panel) => `Error: ${PLAY_SELECTION_SIZE - panel.selection.length} mark is missing`,},
  {max: 6, getMessage: (panel: Panel) => `${panel.selection.join(', ')}`,},
  {max: 7, getMessage: (panel: Panel) => `Error: Please remove ${panel.selection.length - PLAY_SELECTION_SIZE} mark`,},
  {
    max: Number.POSITIVE_INFINITY,
    getMessage: (panel: Panel) => `Error: Please remove ${panel.selection.length - PLAY_SELECTION_SIZE} marks`,
  },
]

@Pipe({name: 'panelSummary'})
export class PanelSummaryPipe implements PipeTransform {
  transform(panel: Panel): any {
    for (let condition of conditions) {
      if (panel.selection.length <= condition.max) return `<b>Panel ${panel.index}</b>: ${condition.getMessage(panel)}`
    }
  }
}
