"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

type CaseLightboxProps = {
  image: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
  indexLabel: string;
  eager?: boolean;
};

export default function CaseLightbox({
  image,
  alt,
  openLabel,
  closeLabel,
  zoomInLabel,
  zoomOutLabel,
  indexLabel,
  eager = false,
}: CaseLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const imageTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
    setZoomOrigin("50% 50%");
    window.requestAnimationFrame(() => imageTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen]);

  return (
    <>
      <button
        className="case-image-link"
        type="button"
        onClick={() => setIsOpen(true)}
        ref={imageTriggerRef}
        aria-haspopup="dialog"
        aria-label={openLabel}
      >
        <img
          src={image}
          alt={alt}
          width="3200"
          height="2000"
          loading={eager ? "eager" : "lazy"}
        />
      </button>

      <figcaption>
        <span>{indexLabel}</span>
        <button className="case-open-button" type="button" onClick={() => setIsOpen(true)}>
          {openLabel}<span className="ui-arrow ui-arrow-up-right" aria-hidden="true" />
        </button>
      </figcaption>

      {isOpen && createPortal(
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label={alt} ref={dialogRef}>
          <div className="case-lightbox-toolbar">
            <button className="case-lightbox-close" type="button" onClick={close} ref={closeButtonRef}>
              <span aria-hidden="true" />{closeLabel}
            </button>
            <span>{indexLabel}</span>
          </div>
          <div className="case-lightbox-stage" onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}>
            <button
              className="case-lightbox-zoom"
              type="button"
              aria-pressed={isZoomed}
              aria-label={isZoomed ? zoomOutLabel : zoomInLabel}
              data-zoomed={isZoomed ? "true" : "false"}
              style={{ "--zoom-origin": zoomOrigin } as CSSProperties}
              onClick={() => setIsZoomed((value) => !value)}
              onPointerMove={(event) => {
                if (!isZoomed) return;
                const imageElement = event.currentTarget.querySelector("img");
                const bounds = imageElement?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
                const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
                setZoomOrigin(`${x}% ${y}%`);
              }}
            >
              <img src={image} alt={alt} width="3200" height="2000" />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
