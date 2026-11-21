"use client";

import { useEffect } from "react";

/** Add ?review to the URL to outline every COPY-DRAFT line on the page. */
export default function ReviewMode() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("review")) {
      document.documentElement.classList.add("review");
    }
  }, []);
  return null;
}
