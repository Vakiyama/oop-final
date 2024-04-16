import path from 'path';

import { Map } from './models/Map';
import { ReportMaker } from './reports/ReportMaker';
import { ComplexReport } from './reports/ComplexReport';
import { SimpleReport } from './reports/SimpleReport';

async function main() {
  const map = new Map(path.join(__dirname, './data.json'), 30);
  await map.printMap();
  console.log('---End of Map---');
  await map.registerForShots();
  const report = new ReportMaker(new ComplexReport(await map.mapData));
  report.printDetails();
  console.log('---End of Report---');
  await map.printMap();
  console.log('---End of Map---');
}

main();
