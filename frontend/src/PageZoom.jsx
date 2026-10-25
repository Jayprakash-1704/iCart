
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageZoom = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAuthPage = ["/login", "/register"].includes(
      pathname.toLowerCase()
    );

    document.documentElement.style.zoom = isAuthPage ? "0.5" : "0.75";

    return () => {
      document.documentElement.style.zoom = "";
    };
  }, [pathname]);

  return null;
};

export default PageZoom;

