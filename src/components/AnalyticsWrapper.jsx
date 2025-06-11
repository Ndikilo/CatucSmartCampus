import { Analytics } from '@vercel/analytics/react';

export const AnalyticsWrapper = ({ children }) => {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
};
