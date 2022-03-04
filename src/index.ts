import { GeoJsonProperties } from 'geojson';
import { lineString, featureCollection } from '@turf/helpers';
import bbox from '@turf/bbox';
import { Rows } from './types.d';
import parse from './parse';

function lineStringProperties(row: string[]): GeoJsonProperties {
  const [timestamp] = row.slice(2);
  return {
    timestamp,
  };
}

function getCoordinate(row: string[]) {
  return row.slice(0, 2).reverse().map(Number);
}

function getCoordinates(rows: Rows, index: number) {
  if (index > 0) {
    return [getCoordinate(rows[index - 1]), getCoordinate(rows[index])];
  }
  if (rows.length === 1) {
    return [getCoordinate(rows[index]), getCoordinate(rows[index])];
  }
  return [getCoordinate(rows[index]), getCoordinate(rows[index + 1])];
}

function makeLineString(row: string[], index: number, rows: Rows) {
  return lineString(getCoordinates(rows, index), lineStringProperties(row));
}

function handler(buffer: ArrayBuffer) {
  const geoJson = featureCollection(parse(buffer).map(makeLineString));
  geoJson.bbox = bbox(geoJson);
  return geoJson;
}

export default handler;
