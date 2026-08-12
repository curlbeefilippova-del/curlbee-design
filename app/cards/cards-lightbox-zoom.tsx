"use client";

import { useState, type CSSProperties } from "react";
import type { CardsLanguage } from "./cards-world-header";

type CardsLightboxZoomProps = {
  src: string;
  alt: string;
  language: CardsLanguage;
};

export default function CardsLightboxZoom({ src, alt, language }: CardsLightboxZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  const zoomInLabel = language === "RU" ? "Увеличить изображение" : "Zoom in";
  const zoomOutLabel = language === "RU" ? "Уменьшить изображение" : "Zoom out";

  return (
    <button
      className="cards-lightbox-zoom card-swap-single"
      type="button"
      aria-pressed={isZoomed}
      aria-label={isZoomed ? zoomOutLabel : zoomInLabel}
      data-zoomed={isZoomed ? "true" : "false"}
      style={{ "--cards-zoom-origin": zoomOrigin } as CSSProperties}
      onClick={() => setIsZoomed((value) => !value)}
      onPointerMove={(event) => {
        if (!isZoomed || event.pointerType === "touch") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
        setZoomOrigin(`${x}% ${y}%`);
      }}
    >
      <img src={src} alt={alt} width="1800" height="2400" />
    </button>
  );
}
