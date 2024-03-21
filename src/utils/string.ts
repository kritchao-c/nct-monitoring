import { DeviceBlockNotification } from '@/components/UI/DeviceBlock/DeviceBlock';

export const handlePeriod = (time: '1min' | '1H' | '1D' | '1W' | '1M' | '1Y'): string => {
  switch (time) {
    case '1min':
      return 'HH:mm';
    case '1H':
      return 'HH:00 ddd';
    case '1D':
      return 'ddd';
    case '1W':
      return 'DD MMM';
    case '1M':
      return 'DD MMM';
    case '1Y':
      return 'YYYY';
    default:
      return 'DD-MMM';
  }
};

export function sortObjectsByDateTimeKey(objects: any[], key: string): any[] {
  // Sort the objects based on the date-time key
  objects.sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return dateA.getTime() - dateB.getTime();
  });

  return objects;
}

export const handleNotificationType = (status: string): DeviceBlockNotification['type'] => {
  switch (status) {
    case 'CRITICAL':
      return 'danger';
    case 'WARNING':
      return 'warning';
    default:
      return 'info';
  }
};
