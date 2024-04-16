import type { MapData } from '../models/Map';
import type { IReport } from './ReportMaker';

export class SimpleReport implements IReport {
  private _mapData: MapData;

  constructor(mapData: MapData) {
    this._mapData = mapData;
  }

  printDetails(): void {
    Object.values(this._mapData.city).forEach((city) => {
      city.clinics.forEach((clinic) => {
        console.log(
          `\n${clinic.name} has ${clinic.queueLength} ${clinic.queueLength === 1 ? 'person' : 'people'
          } in line.`
        );
        clinic.peopleInQueue.forEach((person) => {
          console.log(person.fullName);
        });
      });
    });
  }
}
