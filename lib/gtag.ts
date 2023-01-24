export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
    // @ts-ignore
    window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events

interface GAEvent {
    action: string,
    category: string,
    label: string,
}
export const event = ({ action, category, label }: GAEvent) => {
  // @ts-ignore
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });
};