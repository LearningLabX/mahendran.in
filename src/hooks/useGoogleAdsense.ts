
import { useEffect } from 'react';

export function useGoogleAdsense() {
  useEffect(() => {
    try {
      // Check if AdSense is loaded
      if (window.adsbygoogle) {
        // Push all ad slots for initialization
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        console.log('AdSense not loaded yet');
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);
}

// Add AdSense to window type
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
