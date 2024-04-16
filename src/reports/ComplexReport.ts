import type { MapData } from '../models/Map';
import type { IReport } from './ReportMaker';

export class ComplexReport implements IReport {
  private _mapData: MapData;

  constructor(mapData: MapData) {
    this._mapData = mapData;
  }

  printDetails(): void {
    Object.entries(this._mapData.city).forEach(([cityName, city]) => {
      const results = city.clinics.map((clinic) => {
        return {
          name: clinic.name,
          queueLength: clinic.queueLength,
          time: clinic.getWaitTime(),
          clinic,
        };
      });
      const totalWaitTime = results.reduce((time, result) => {
        return time + result.time;
      }, 0);
      const averageWaitTime = totalWaitTime / city.clinics.length;
      console.log(
        `=====================\n${cityName} has an average wait time of ${averageWaitTime} minutes.`
      );
      results.forEach((result) => {
        console.log(
          `\n${result.name} has ${result.queueLength} ${result.queueLength === 1 ? 'person' : 'people'
          } in line.`
        );
        result.clinic.peopleInQueue.forEach((person) => {
          console.log(person.fullName);
        });
      });
    });
  }
}
