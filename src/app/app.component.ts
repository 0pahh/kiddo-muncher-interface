import { Component, OnInit } from '@angular/core';
import { Decor } from './classes/Decor';
import { Entity, Kiddo } from './classes/Entity';
import { Simulation } from './classes/Simulation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kiddo-muncher-interface';
  simulation = new Simulation();
  simulationData: string[][] = [];
  start = false;
  boardSize = 6;
  interval: any;

  ngOnInit(): void {
    this.simulation.board.setBoardSize(this.boardSize);
  }
  setBoardSize(value: number) {
    if (value < 3) value = 3;
    else if (value > 16) value = 16;
    this.simulation.board.setBoardSize(value);
  }
  startSimulation(): void {
    this.start = !this.start;
    if (this.start) {
      let localSimulation = this.simulation.returnSimulation();
      let i = 0;
      this.interval = setInterval(() => {
        if (i === localSimulation.length - 1) {
          clearInterval(this.interval);
          this.start = false;
        }
        this.simulationData = localSimulation[i];
        i++;
      }, 250);
    } else {
      this.simulationData = [];

      if (this.interval) clearInterval(this.interval);
    }
  }
}
