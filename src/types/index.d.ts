export type GraphPeriods = '1min' | '1H' | '1D' | '1W' | '1M' | '1Y';

export interface UserInfo {
  created: string;
  fullname: string;
  role: string;
  username: string;
}

export interface OverallResponse {
  errorCode: number;
  result: OverallResult;
}

export interface OverallResult {
  total: OverallTotal;
  geoMap: OverallGeoMap[];
  regions: OverallRegion[];
}

export interface OverallTotal {
  alllDevice: number;
  allOnline: number;
  allOffline: number;
}

export interface OverallGeoMap {
  name: string;
  latitude: number;
  longtitude: number;
}

export interface OverallRegion {
  region: string;
  amount: number;
  deviceOnline: number;
  deviceOffline: number;
  panelOnline: number;
  panelOffline: number;
  batteryOnline: number;
  batteryOffline: number;
  loadOnline: number;
  loadOffline: number;
  criticalAll: number;
  warning: number;
}

export interface OverallGraphResponse {
  errorCode: number;
  result: OverallGraphResult;
}

export interface OverallGraphResult {
  type: string;
  period: string;
  data: OverallGraphData[];
}

export interface OverallGraphData {
  datetime: string;
  value?: number;
}

export interface OverallNotificationsResponse {
  errorCode: number;
  result: OverallNotificationsResult[];
}

export interface OverallNotificationsResult {
  device: string;
  status: string;
  title: string;
  description: string;
  region: string;
  province: string;
  Time: string;
}
