import { Decor } from './Decor';
import { Entity } from './Entity';

export class Board {
  public nbRows = 8;
  public nbCols = 8;

  public console!: ((Entity | Decor) | null)[][];

  constructor() {
    this.console = this.generateBlankConsole();
  }

  public generateBlankConsole = (): ((Entity | Decor) | null)[][] => {
    const consoleData: ((Entity | Decor) | null)[][] = [];

    for (let i = 0; i < this.nbRows; i++) {
      consoleData[i] = [];
      for (let j = 0; j < this.nbCols; j++) {
        consoleData[i][j] = null;
      }
    }
    return consoleData;
  };

  public setBoardSize = (size: number): void => {
    this.nbRows = size;
    this.nbCols = size;
    this.console = this.generateBlankConsole();
  };
}
