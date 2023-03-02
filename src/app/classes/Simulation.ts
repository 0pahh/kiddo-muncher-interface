import { randomMove, randomPosition } from '../utils/random';
import { Board } from './Board';
import { Decor, DecorFactory } from './Decor';

import { DeadKiddo, Entity, Kiddo, KiddoFactory, Ogre } from './Entity';

export class Simulation {
  start = false;
  nbTurns = 10;
  board = new Board();
  data: (Entity | Decor)[] = [];

  generateData = (): void => {
    this.data = [];
    this.generateOgre(); // Generate Ogre, 1
    this.generateKiddos(); // Generate Kiddos, 15% to 25% of the board wo ogre
    this.generateDecors(); // Generate Decors, 10% to 40% of the board wo ogre
  };

  public returnSimulation = (): any[][] => {
    const simulationArray: any[][] = [];
    this.generateData();
    this.start = true;
    for (let i = 0; i < this.nbTurns; i++) {
      this.data.forEach((entity) => {
        if (entity instanceof Ogre) {
          let hasMoved = false;
          const aroundEntities = this.getEntitiesAround(entity); // Get entities around the ogre

          const directions = ['up', 'down', 'left', 'right'];
          for (const direction of directions) {
            const kiddo = aroundEntities[direction];
            if (
              kiddo instanceof Kiddo &&
              kiddo instanceof DeadKiddo === false
            ) {
              const deadKiddo = entity.eat(kiddo);
              const index = this.data.indexOf(kiddo);
              this.data.splice(index, 1, deadKiddo);
              entity.position = deadKiddo.position;
              hasMoved = true;
              break;
            }
          }

          if (!hasMoved) {
            const forbiddenMoves: ('up' | 'down' | 'left' | 'right')[] = [];
            for (const id in aroundEntities) {
              if (
                aroundEntities[id] !== null &&
                aroundEntities[id] instanceof Decor
              )
                forbiddenMoves.push(id as 'up' | 'down' | 'left' | 'right');
            }

            if (entity.position.x === 0) {
              forbiddenMoves.push('up');
            }
            if (entity.position.x === this.board.nbRows - 1) {
              forbiddenMoves.push('down');
            }
            if (entity.position.y === 0) {
              forbiddenMoves.push('left');
            }
            if (entity.position.y === this.board.nbCols - 1) {
              forbiddenMoves.push('right');
            }

            const move = randomMove(entity.lastMove, forbiddenMoves); // Get a random move because the ogre is random

            if (move) entity.move(move);
          }
        }
        if (entity instanceof Kiddo && entity instanceof DeadKiddo === false) {
          const aroundEntities = this.getEntitiesAround(entity); // Get entities around the kiddo

          if (entity.movementType === 'stay') return;

          const forbiddenMoves: ('up' | 'down' | 'left' | 'right')[] = [];
          for (const id in aroundEntities) {
            if (
              aroundEntities[id] !== null &&
              aroundEntities[id] instanceof Decor
            )
              forbiddenMoves.push(id as 'up' | 'down' | 'left' | 'right');
          }

          if (entity.position.x === 0) {
            forbiddenMoves.push('up');
          }
          if (entity.position.x === this.board.nbRows - 1) {
            forbiddenMoves.push('down');
          }
          if (entity.position.y === 0) {
            forbiddenMoves.push('left');
          }
          if (entity.position.y === this.board.nbCols - 1) {
            forbiddenMoves.push('right');
          }

          let move;
          if (entity.movementType === 'random') {
            move = randomMove(entity.lastMove, forbiddenMoves); // Get a random move because the ogre is random
          } else
            move = randomMove(
              entity.lastMove,
              forbiddenMoves,
              entity.movementType
            ); // Get a random move because the ogre is random

          if (move) entity.move(move);
        }

        this.board.console = this.board.generateBlankConsole();
        for (const data of this.data) {
          const entitiesOnCase = this.data.filter(
            (entity) => entity.position === data.position
          );
          if (entitiesOnCase.length > 1) {
            const ogre = entitiesOnCase.find(
              (entity) => entity instanceof Ogre
            );
            const kiddo = entitiesOnCase.find(
              (entity) => entity instanceof Kiddo
            );
            if (ogre) {
              this.board.console[data.position.x][data.position.y] =
                ogre.symbol;
            } else if (kiddo) {
              this.board.console[data.position.x][data.position.y] =
                kiddo.symbol;
            }
          } else {
            this.board.console[data.position.x][data.position.y] = data.symbol;
          }

          // console.log(
          //   this.data.some((entity) => entity.position === data.position)
          // );

          // if (
          //   data instanceof DeadKiddo ||
          //   (data instanceof Decor && data.traversable)
          // ) {
          //   const existingEntity = this.data.find(
          //     (entity) =>
          //       entity.position.x === data.position.x &&
          //       entity.position.y === data.position.y &&
          //       entity !== data
          //   );
          //   if (existingEntity) continue;
          //   else {
          //     this.board.console[data.position.x][data.position.y] = data.symbol;
          //   }
          // }
          // this.board.console[data.position.x][data.position.y] = data.symbol;
        }
        simulationArray.push(this.board.console);
      });
    }
    return simulationArray;
  };

  generateOgre = (): void => {
    const pos = randomPosition(this.board);
    if (pos.x === null || pos.y === null)
      throw new Error('No more space on the board');

    const ogre = new Ogre().createInstance({ x: pos.x, y: pos.y });
    this.data.push(ogre);

    // this.board.console[pos.x][pos.y] = ogre.symbol;
  };

  generateDecors = (): void => {
    const maxNumber = Math.floor(
      (this.board.nbRows * this.board.nbCols - 1) * 0.4
    );
    const minNumber = Math.ceil(
      (this.board.nbRows * this.board.nbCols - 1) * 0.1
    );

    const nbDecors =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    for (let i = 0; i < nbDecors; i++) {
      const pos = randomPosition(this.board);

      if (pos.x === null || pos.y === null)
        throw new Error('No more space on the board');

      const decor = new DecorFactory().createInstance({ x: pos.x, y: pos.y });
      this.data.push(decor);

      //   this.board.console[pos.x][pos.y] = decor.symbol;
    }
  };
  generateKiddos = (): void => {
    const pos = randomPosition(this.board);
    if (pos.x === null || pos.y === null)
      throw new Error('No more space on the board');

    const maxNumber = Math.floor(
      (this.board.nbRows * this.board.nbCols - 1) * 0.25
    );
    const minNumber = Math.ceil(
      (this.board.nbRows * this.board.nbCols - 1) * 0.15
    );

    const nbKiddos =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    for (let i = 0; i < nbKiddos; i++) {
      const pos = randomPosition(this.board);

      if (pos.x === null || pos.y === null)
        throw new Error('No more space on the board');

      const kiddo = new KiddoFactory().createInstance({ x: pos.x, y: pos.y });
      this.data.push(kiddo);

      //   this.board.console[pos.x][pos.y] = kiddo.displayType;
    }
  };

  getEntitiesAround = (entity: Entity) => {
    const { x, y } = entity.position;
    const entities = ['up', 'down', 'left', 'right'].reduce(
      (result, direction) => {
        const [dx, dy] =
          direction === 'up'
            ? [-1, 0]
            : direction === 'down'
            ? [1, 0]
            : direction === 'left'
            ? [0, -1]
            : [0, 1];
        result[direction] =
          this.data.find(
            (e) => e.position.x === x + dx && e.position.y === y + dy
          ) || null;
        return result;
      },
      {} as Record<string, Entity | Decor | null>
    );
    return entities;
  };
}
