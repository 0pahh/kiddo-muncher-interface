enum DecorSymbol {
  Tree = '\u{1F333}', 
  Rock = '\u{1F5FB}',
  Water = '\u{1F4A7}',
  Bridge = '\u{1F309}',
  Ground = '\u{1F39F}',
}

class DecorType {
  symbol: DecorSymbol;
  traversable: boolean;

  constructor(symbol: DecorSymbol, traversable: boolean) {
    this.symbol = symbol;
    this.traversable = traversable;
  }

  createInstance(position: { x: number; y: number }): Decor {
    const instance = new Decor();
    instance.traversable = this.traversable;
    instance.symbol = this.symbol;
    instance.position = position;
    return instance;
  }
}

class Blocking extends DecorType {
  constructor(type: DecorSymbol) {
    super(type, false);
  }
}

class NonBlocking extends DecorType {
  constructor(type: DecorSymbol) {
    super(type, true);
  }
}

abstract class CreatorDecorFac {
  abstract createInstance(position: { x: number; y: number }): Decor;
}

export class DecorFactory extends CreatorDecorFac {
  public createInstance(position: { x: number; y: number }): Decor {
    const blockingTypes = [
      DecorSymbol.Tree,
      DecorSymbol.Rock,
      DecorSymbol.Water,
    ];
    const nonBlockingTypes = [DecorSymbol.Bridge, DecorSymbol.Ground];
    const blocking = Math.random() < 0.5;
    const tempType = blocking
      ? blockingTypes[Math.floor(Math.random() * blockingTypes.length)]
      : nonBlockingTypes[Math.floor(Math.random() * nonBlockingTypes.length)];

    switch (tempType) {
      case DecorSymbol.Tree:
        return new Blocking(DecorSymbol.Tree).createInstance(position);
      case DecorSymbol.Rock:
        return new Blocking(DecorSymbol.Rock).createInstance(position);
      case DecorSymbol.Water:
        return new Blocking(DecorSymbol.Water).createInstance(position);
      case DecorSymbol.Bridge:
        return new NonBlocking(DecorSymbol.Bridge).createInstance(position);
      case DecorSymbol.Ground:
        return new NonBlocking(DecorSymbol.Ground).createInstance(position);
    }
  }
}

export class Decor {
  position!: { x: number; y: number };
  traversable = false;
  symbol!: DecorSymbol;
}
