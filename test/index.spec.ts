// import assert from 'assert';
import { readFileSync, writeFileSync } from 'fs';
import handler from '../src/';

const filePath = './assets/Waterspeed-2021-10-15-15.34.18.csv';

describe('csv2geo', () => {

  it('should be able to parse a CSV file', function() {
    // this.timeout(10000);
    const buffer: ArrayBuffer = readFileSync(filePath);
    const result = handler(buffer);
    writeFileSync('./assets/geo.json', JSON.stringify(result));
  });

});
