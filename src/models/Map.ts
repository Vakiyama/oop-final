import { readFile } from 'fs/promises';
import { Household } from './Household';
import { Clinic } from './Clinic';
import { Person } from './Person';
import type { IBuilding } from '../interfaces/IBuilding';

export type MapData = {
  city: {
    [name: string]: {
      households: Household[];
      clinics: Clinic[];
    };
  };
};

export class Map {
  private _mapData: Promise<MapData>;
  private _currentIntake: number;

  constructor(filename: string, currentIntake: number) {
    const mapJson = readFile(filename, 'utf-8');
    this._mapData = this.constructMap(mapJson);
    this._currentIntake = currentIntake;
  }

  public async registerForShots() {
    const { city: cities } = await this._mapData;
    Object.entries(cities).forEach(([cityName, city]) => {
      city.households.forEach((household) => {
        household.people.forEach((person) => {
          this.registerPersonForShots(person, cityName, household);
        });
      });
    });
  }

  private async findNearestClinic(
    cityName: string,
    household: Household
  ): Promise<Clinic> {
    const { city: cities } = await this._mapData;
    return cities[cityName].clinics.reduce((nearestClinic, clinic) => {
      const distance = Math.abs(household.blockNumber - clinic.blockNumber);
      const nearestClinicDistance = Math.abs(
        household.blockNumber - nearestClinic.blockNumber
      );

      return distance < nearestClinicDistance ? clinic : nearestClinic;
    });
  }

  public get mapData() {
    return this._mapData;
  }

  private async registerPersonForShots(
    person: Person,
    cityName: string,
    household: Household
  ) {
    if (person.vaccinationStatus) return;
    if (person.age < this._currentIntake) return;
    const nearestClinic = await this.findNearestClinic(cityName, household);
    nearestClinic.registerForShot(person);
  }

  public async printMap() {
    const { city: cities } = await this._mapData;
    const maxLength = Object.values(cities).reduce((maxLength, city) => {
      const length = city.households.length + city.clinics.length;
      return length > maxLength ? length : maxLength;
    }, 0);

    const displayMap = Object.values(cities).map((city) => {
      const buildings = [...city.clinics, ...city.households];
      return this.formatBuildings(buildings, maxLength);
    });

    displayMap.forEach((line) => {
      console.log(line.join(','));
    });
  }

  private formatBuildings(buildings: IBuilding[], maxLength: number): string[] {
    const emptyArray: (IBuilding | null)[] = [];
    for (let i = 0; i < maxLength; i++) {
      emptyArray.push(null);
    }
    buildings.forEach((building) => {
      const blockNumber = building.blockNumber;
      emptyArray[blockNumber] = building;
    });

    return emptyArray.map(this.mapToASCII);
  }

  private mapToASCII(building: IBuilding | null): string {
    if (building instanceof Clinic) return 'C';
    if (building instanceof Household) {
      return building.isFullyVaccinated() ? 'F' : 'H';
    }
    return 'X';
  }

  private async constructMap(
    mapJsonPromise: Promise<string>
  ): Promise<MapData> {
    const mapJson = JSON.parse(await mapJsonPromise) as MapData;
    Object.keys(mapJson.city).forEach((city) => {
      mapJson.city[city].clinics = mapJson.city[city].clinics.map(
        (clinic: any) => {
          return new Clinic(clinic.name, clinic.numberOfStaff, clinic.blockNum);
        }
      );

      mapJson.city[city].households = mapJson.city[city].households.map(
        (household: any) => {
          const people = (household as any).inhabitants.map((person: any) => {
            return new Person(
              person.phn,
              person.fullName,
              person.age,
              person.isVaccinated
            );
          });
          return new Household(household.blockNum, people);
        }
      );
    });

    return mapJson;
  }
}
