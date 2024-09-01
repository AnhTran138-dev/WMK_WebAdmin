export interface GeoResponse {
  type: string;
  features: Feature[];
  query: Query;
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
  bbox: number[];
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  country: string;
  country_code: string;
  city: string;
  postcode?: string;
  district?: string;
  suburb?: string;
  quarter?: string;
  street: string;
  datasource: Datasource;
  lon: number;
  lat: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  timezone: Timezone;
  plus_code: string;
  rank: Rank;
  place_id: string;
  state?: string;
  county?: string;
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface Rank {
  confidence: number;
  match_type: string;
}

export interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
}

export interface Query {
  text: string;
  parsed: Parsed;
}

export interface Parsed {
  street: string;
  expected_type: string;
}
