import type { IBuilding } from '../interfaces/IBuilding';
import { Person } from './Person';

export class Household implements IBuilding {
  private _blockNumber: number;
  private _people: Person[];

  constructor(blockNumber: number, people: Person[]) {
    this._blockNumber = blockNumber;
    this._people = people;
  }

  public isFullyVaccinated() {
    return !this._people.some((person) => !person.vaccinationStatus);
  }

  public get blockNumber() {
    return this._blockNumber;
  }

  public get people() {
    return this._people;
  }
}
