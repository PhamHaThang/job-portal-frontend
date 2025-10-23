import { useEffect } from "react";

const APP_NAME = "Cổng Thông Tin Việc Làm";

export const formatDocumentTitle = (title) => (title ? `${title}` : APP_NAME);

export const useDocumentTitle = (title, options = {}) => {
  const { restoreOnUnmount = true } = options;

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const previousTitle = document.title;
    document.title = formatDocumentTitle(title);

    return () => {
      if (!restoreOnUnmount || typeof document === "undefined") return;
      document.title = previousTitle;
    };
  }, [title, restoreOnUnmount]);
};
