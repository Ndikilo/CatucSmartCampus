export const RATES = {
  STANDARD: 5, // per hour
  PREMIUM: 8,   // per hour for high-end devices
};

export const DEVICE_TYPES = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
} as const;

export const SNACKBAR_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const DURATION_OPTIONS = [
  { value: 0.5, label: '30 minutes' },
  { value: 1, label: '1 hour' },
  { value: 2, label: '2 hours' },
  { value: 3, label: '3 hours' },
  { value: 4, label: '4 hours' },
  { value: 5, label: '5 hours' },
  { value: 6, label: '6 hours' },
  { value: 7, label: '7 hours' },
  { value: 8, label: '8 hours' },
] as const;
