
import { analytics, logEvent } from './firebase';

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  logEvent(analytics, 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href
  });
};

// Track custom events
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  logEvent(analytics, eventName, eventParams);
};

// Track blog post views
export const trackBlogView = (blogId: string, blogTitle: string) => {
  logEvent(analytics, 'blog_view', {
    blog_id: blogId,
    blog_title: blogTitle
  });
};

// Track project views
export const trackProjectView = (projectId: string, projectTitle: string) => {
  logEvent(analytics, 'project_view', {
    project_id: projectId,
    project_title: projectTitle
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  logEvent(analytics, 'form_submission', {
    form_name: formName
  });
};
