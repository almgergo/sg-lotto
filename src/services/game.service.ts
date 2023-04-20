import {Injectable} from '@angular/core';
import {PLAY_COLUMN_SIZE, PLAY_ROW_SIZE} from "@util/constants";

@Injectable()
export class GameService {

  private playNumbers = Array.from({length: PLAY_COLUMN_SIZE * PLAY_ROW_SIZE}, (value, index) => index + 1)

  public randomSelection(length: number): Array<number> {
    this.shuffleArray(this.playNumbers)
    return this.playNumbers.slice(0, length)
  }

  private shuffleArray(array: Array<number>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
