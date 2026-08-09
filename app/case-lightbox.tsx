"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CaseLightboxProps = {
  image: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
  indexLabel: string;
  eager?: boolean;
};

export default function CaseLightbox({
  image,
  alt,
  openLabel,
  closeLabel,
  indexLabel,
  eager = false,
}: CaseLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => imageTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
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
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label={alt}>
          <div className="case-lightbox-toolbar">
            <button className="case-lightbox-close" type="button" onClick={close} ref={closeButtonRef}>
              <span aria-hidden="true" />{closeLabel}
            </button>
            <span>{indexLabel}</span>
          </div>
          <div className="case-lightbox-stage" onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}>
            <img src={image} alt={alt} width="3200" height="2000" />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
