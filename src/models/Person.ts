export class Person {
  private _personalHealthNumber: string;
  private _fullName: string;
  private _age: number;
  private _vaccinationStatus: boolean;

  constructor(
    personalHealthNumber: string,
    fullName: string,
    age: number,
    vaccinationStatus: boolean
  ) {
    this._personalHealthNumber = personalHealthNumber;
    this._fullName = fullName;
    this._age = age;
    this._vaccinationStatus = vaccinationStatus;
  }

  public get personalHealthNumber() {
    return this._personalHealthNumber;
  }

  public get fullName() {
    return this._fullName;
  }

  public get age() {
    return this._age;
  }

  public get vaccinationStatus() {
    return this._vaccinationStatus;
  }

  public vaccinate() {
    this._vaccinationStatus = true;
  }
}
