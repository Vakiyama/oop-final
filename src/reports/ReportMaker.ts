export interface IReport {
  printDetails(): void;
}

export class ReportMaker {
  private _report: IReport;

  constructor(report: IReport) {
    this._report = report;
  }

  public printDetails() {
    this._report.printDetails();
  }
}
