"use client";

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";

export function useCardsLightbox(
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  selectRelativeCard: (direction: number) => void,
) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key === "ArrowLeft") selectRelativeCard(-1);
      if (event.key === "ArrowRight") selectRelativeCard(1);
      if (event.key !== "Tab") return;

      const controls = Array.from(
        dialogRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
      );
      const firstControl = controls[0];
      const lastControl = controls.at(-1);

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl?.focus();
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, selectRelativeCard, setIsOpen]);

  return { dialogRef, closeButtonRef };
}
