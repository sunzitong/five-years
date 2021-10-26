import http from "./http";
import { env } from "@/store";
import { IdField } from "@guanyu/shared";

const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 测试数据
 */
export type Demo = {
  name: string;
  id: IdField;
  value: number;
};

/**
 * 测试 - 本地mock
 */
export function getDemo() {
  return http.get<Demo[]>(`${BASE_URL}/demo/test`, {
    activityNumber: env.NODE_ENV,
  });
}

export interface MapJson {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: FeatureType;
  properties: Properties;
  geometry: Geometry;
}

export interface Geometry {
  type: GeometryType;
  coordinates: Array<Array<Array<number[] | number>>>;
}

export enum GeometryType {
  MultiPolygon = "MultiPolygon",
  Polygon = "Polygon",
}

export interface Properties {
  adcode: number | string;
  name: string;
  center?: number[];
  centroid?: number[];
  childrenNum?: number;
  level?: Level;
  parent?: Parent;
  subFeatureIndex?: number;
  acroutes?: number[];
  adchar?: string;
}

export enum Level {
  Province = "province",
}

export interface Parent {
  adcode: number;
}

export enum FeatureType {
  Feature = "Feature",
}

/**
 * 获取地图数据
 * @param id 行政编号
 * @returns 地图geo数据
 */
export function getMapJson(id: number) {
  return (http.get(`/map-json/${id}.json`) as unknown) as Promise<MapJson>;
}
