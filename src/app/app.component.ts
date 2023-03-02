import { Component } from '@angular/core';
import { Simulation } from './classes/Simulation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kiddo-muncher-interface';
  simulation = new Simulation();
  simulationDataSymbols: (string | null)[][] = [];
  start = false;

  interval: any;

  startSimulation(): void {
    this.start = !this.start;
    if (this.start) {
      let simulation = this.simulation.returnSimulation();
      let i = 0;
      this.interval = setInterval(() => {
        if (i === simulation.length - 1) {
          clearInterval(this.interval);
          this.start = false;
        }
        this.simulationDataSymbols = simulation[i];
        i++;
      }, 250);
    } else {
      this.simulationDataSymbols = [];

      if (this.interval) clearInterval(this.interval);
    }
  }
}
