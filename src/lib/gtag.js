export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Events spécifiques pour Wendogo
export const trackProgramView = (programSlug, schoolName) => {
  event({
    action: 'view_program',
    category: 'engagement',
    label: `${schoolName} - ${programSlug}`,
  });
};

export const trackSchoolView = (schoolSlug, schoolName) => {
  event({
    action: 'view_school',
    category: 'engagement', 
    label: `${schoolName} - ${schoolSlug}`,
  });
};

export const trackSearch = (searchTerm, resultsCount) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultsCount,
  });
};

export const trackFavoriteAdd = (type, itemName) => {
  event({
    action: 'add_to_favorites',
    category: 'engagement',
    label: `${type} - ${itemName}`,
  });
};

export const trackUserSignup = (method) => {
  event({
    action: 'sign_up',
    category: 'user',
    label: method, // 'google', 'facebook', 'email'
  });
};

export const trackPageView = (page_name) => {
  event({
    action: 'page_view',
    category: 'navigation',
    label: page_name,
  });
}
