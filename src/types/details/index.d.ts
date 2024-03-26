export interface DeviceDetailResponse {
  errorCode: number;
  result: DeviceDetail;
}

export interface DeviceDetail {
  name: string;
  dailyPower: number;
  dailySaving: number;
  details: DeviceDetails;
  operating: DeviceDetailOperating;
  control: DeviceDetailControl;
  overall: DeviceDetailOverall;
}

export interface DeviceDetails {
  panelVoltage: number;
  current: number;
  charging: string;
  batteryVoltage: string;
  temperature: number;
}

export interface DeviceDetailOperating {
  operating: string;
  battery: string;
  fan: string;
  temperature: string;
  outputDC: string;
}

export interface DeviceDetailControl {
  chargingOutputRelay: string;
  loadOutput: string;
  fan: string;
  overChargeProtectionMark: string;
  overVoltageProtectionMark: string;
}

export interface DeviceDetailOverall {
  systemefficiency: number;
  energyutilization: number;
  energycostsavings: number;
  production: number;
  consumption: number;
}
