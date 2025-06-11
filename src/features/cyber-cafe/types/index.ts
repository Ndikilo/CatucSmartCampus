export type DeviceType = 'desktop' | 'laptop';

export interface Device {
  id: number;
  name: string;
  type: DeviceType;
  status: 'available' | 'in-use';
  specs: string;
}

export interface Booking {
  id: number;
  computerId: number;
  computerName: string;
  userName: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  totalCost: number;
  status: 'active' | 'completed';
}

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}
