export const RATES = {
  STANDARD: 100, // FCFA per hour
  PREMIUM: 150,  // FCFA per hour
} as const;

export const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export const DEVICE_TYPES = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
} as const;

export const DEVICE_STATUS = {
  AVAILABLE: 'available',
  IN_USE: 'in-use',
} as const;

export const BOOKING_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export const SNACKBAR_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;
