import type { IBuilding } from '../interfaces/IBuilding';
import { Person } from './Person';
import { Queue } from './Queue';

export class Clinic implements IBuilding {
  private _name: string;
  private _numberOfStaff: number;
  private _blockNumber: number;
  private _waitlistQueue: Queue<Person> = new Queue(15);

  constructor(name: string, numberOfStaff: number, blockNumber: number) {
    this._name = name;
    this._numberOfStaff = numberOfStaff;
    this._blockNumber = blockNumber;
  }

  public get name() {
    return this._name;
  }

  public get numberOfStaff() {
    return this._numberOfStaff;
  }

  public get blockNumber() {
    return this._blockNumber;
  }

  public get queueLength() {
    return this._waitlistQueue.size;
  }

  public get peopleInQueue() {
    return this._waitlistQueue.queue;
  }

  public registerForShot(person: Person) {
    person.vaccinate();
    this._waitlistQueue.enqueue(person);
  }

  public getWaitTime() {
    return this._waitlistQueue.getCurrentWaitTime();
  }
}
