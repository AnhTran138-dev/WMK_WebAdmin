export interface PlaceDetail {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Geometry {
  type: string;
  coordinates: Array<Array<number[]>>;
}

export interface Properties {
  feature_type: string;
  name: string;
  name_other: NameOther;
  name_international: NameInternational;
  wiki_and_media: WikiAndMedia;
  categories: string[];
  datasource: Datasource;
  city: string;
  country: string;
  country_code: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  lat: number;
  lon: number;
  timezone: Timezone;
  place_id: string;
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
  raw: Raw;
}

export interface Raw {
  name: string;
  osm_id: number;
  "name:en": string;
  "name:ko": string;
  "name:vi": string;
  "name:zh": string;
  alt_name: string;
  boundary: string;
  osm_type: string;
  wikidata: string;
  "is_in:city": string;
  admin_level: number;
  "name:zh-Hans": string;
  "name:zh-Hant": string;
}

export interface NameInternational {
  en: string;
  ko: string;
  vi: string;
  zh: string;
}

export interface NameOther {
  alt_name: string;
}

export interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
}

export interface WikiAndMedia {
  wikidata: string;
}
