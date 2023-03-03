export interface Entity {
  position: { x: number; y: number };
  lastMove: 'up' | 'down' | 'left' | 'right' | null;
  symbol: string;
  move(direction: 'up' | 'down' | 'left' | 'right'): void;
}

export class Ogre implements Entity {
  position!: { x: number; y: number };
  lastMove: 'up' | 'down' | 'left' | 'right' | null = null;
  symbol = '👹';

  createInstance(position: { x: number; y: number }): Ogre {
    const instance = new Ogre();
    instance.position = position;
    return instance;
  }

  eat(kiddo: Kiddo): DeadKiddo {
    const deadKiddo = new DeadKiddo(kiddo.position);
    return deadKiddo;
  }
  move(direction: 'up' | 'down' | 'left' | 'right') {
    const randomNum: number = Math.floor(Math.random() * 4);
    if (randomNum === 0) {
      return; // Stay random
    }
    switch (direction) {
      case 'up':
        this.position.x--;
        break;
      case 'down':
        this.position.x++;
        break;
      case 'left':
        this.position.y--;
        break;
      case 'right':
        this.position.y++;
        break;
    }
  }
}

enum MovementType {
  Random = 'random',
  MoveRight = 'right',
  MoveLeft = 'left',
  MoveUp = 'up',
  MoveDown = 'down',
  Stay = 'stay',
}

enum DisplayType {
  Standard = '👶',
  Girl = '👧',
  Boy = '👦',
  Hat = '🤠',
  Instrument = '🧑‍🎤',
}

enum DeadType {
  Nothing = '👻',
  Dust = '🌫️',
  Fall = '💩', //
  Bones = '🦴', //
}

export class Kiddo implements Entity {
  position: { x: number; y: number };
  movementType: MovementType;
  displayType: DisplayType;
  lastMove: 'up' | 'down' | 'left' | 'right' | null = null;
  symbol!: string;

  constructor(
    position: { x: number; y: number },
    movementType: MovementType = MovementType.Random,
    displayType: DisplayType = DisplayType.Standard,
    symbol: string = 'K'
  ) {
    this.position = position;
    this.movementType = movementType;
    this.displayType = displayType;
    this.symbol = symbol;
  }

  move(direction: 'up' | 'down' | 'left' | 'right') {
    switch (direction) {
      case 'up':
        this.position.x--;
        break;
      case 'down':
        this.position.x++;
        break;
      case 'left':
        this.position.y--;
        break;
      case 'right':
        this.position.y++;
        break;
    }
  }

  display() {
    // TODO: implémenter la logique d'affichage en fonction de displayType
  }
}

export class DeadKiddo extends Kiddo {
  deadType: DeadType;
  override symbol = 'X';
  constructor(position: { x: number; y: number }) {
    super(position);
    this.deadType = this.attributeDeadType();
    this.symbol = this.attributeDeadType();
  }

  attributeDeadType() {
    const deathTypes = [
      DeadType.Nothing,
      DeadType.Dust,
      DeadType.Fall,
      DeadType.Bones,
    ];

    const deathType = deathTypes[Math.floor(Math.random() * deathTypes.length)];
    return deathType;
  }
}

export abstract class Creator {
  abstract createInstance(position: { x: number; y: number }): Kiddo;
}

export class KiddoFactory extends Creator {
  public createInstance(position: { x: number; y: number }): Kiddo {
    const kiddosMovementsType = [
      MovementType.Random,
      MovementType.MoveRight,
      MovementType.MoveLeft,
      MovementType.MoveUp,
      MovementType.MoveDown,
      MovementType.Stay,
    ];

    const kiddosDisplayType = [
      DisplayType.Standard,
      DisplayType.Boy,
      DisplayType.Girl,
      DisplayType.Hat,
      DisplayType.Instrument,
    ];

    const movementType =
      kiddosMovementsType[
        Math.floor(Math.random() * kiddosMovementsType.length)
      ];
    const displayType =
      kiddosDisplayType[Math.floor(Math.random() * kiddosDisplayType.length)];

    return new Kiddo(position, movementType, displayType, displayType);
  }
}
