import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls the page to the top whenever the route changes.
 * This improves the user experience by ensuring that navigation starts at the top of each new page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current URL path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the pathname changes
  }, [pathname]);

  return null; // This component does not render anything
};

export default ScrollToTop;
