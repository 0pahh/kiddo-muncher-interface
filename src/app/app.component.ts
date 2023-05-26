import { Component, OnInit } from '@angular/core';
import { Decor } from './classes/Decor';
import { DeadKiddo, Entity, Kiddo } from './classes/Entity';
import { Simulation } from './classes/Simulation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kiddo-muncher-interface';
  simulation = new Simulation();
  simulationData: (Entity | Decor)[][] = [];
  start = false;
  boardSize = 6;
  interval: any;
  aliveChildrens!: number;
  finished = false;
  nbTurnMaximum = 50;
  turnTime = 500;
  ngOnInit(): void {
    this.simulation.board.setBoardSize(this.boardSize);
  }
  setBoardSize(value: number) {
    if (value < 3) value = 3;
    else if (value > 12) value = 12;
    this.simulation.board.setBoardSize(value);
  }
  setTurnsMax(value: number) {
    if (value < 10) value = 10;
    else if (value > 1000) value = 1000;
    this.simulation.setTurnsMax(value);
  }
  setTurnTime(value: number) {
    if (value < 50) value = 50;
    else if (value > 2500) value = 2500;
    this.turnTime = value;
  }
  actualTurn = 0;
  startSimulation(): void {
    this.simulationData = [];
    this.finished = false;
    this.start = true;
    if (this.start) {
      let localSimulation = this.simulation.returnSimulation();

      this.actualTurn = 0;
      

      this.interval = setInterval(() => {
        if (this.actualTurn === localSimulation.length - 1) {
          clearInterval(this.interval);
          this.finished = true;
        }
        this.simulationData = localSimulation[this.actualTurn];
        this.aliveChildrens = localSimulation[this.actualTurn]
          .flat()
          .filter(
            (obj) => obj instanceof Kiddo && obj instanceof DeadKiddo === false
          ).length; // Filter for instances of kiddo // Get the length of the filtered array

        if (this.aliveChildrens === 0) {
          clearInterval(this.interval);
          this.finished = true;
        }
        this.actualTurn++;
      }, this.turnTime);
    } else {
      this.simulationData = [];

      if (this.interval) clearInterval(this.interval);
    }
  }
  stopSimulation(): void {
    if (this.interval) clearInterval(this.interval);
    this.simulationData = [];
    this.finished = false;
    this.start = false;
  }
}
