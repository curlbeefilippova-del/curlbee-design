"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CARD_SETTLE_MS = 560;

export function useCardSwap(cardCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectIndex = useCallback((nextIndex: number) => {
    const normalizedIndex = (nextIndex + cardCount) % cardCount;
    const currentIndex = activeIndexRef.current;

    if (normalizedIndex === currentIndex) return;

    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setPreviousIndex(currentIndex);
    activeIndexRef.current = normalizedIndex;
    setActiveIndex(normalizedIndex);
    fadeTimerRef.current = setTimeout(() => {
      setPreviousIndex(null);
      fadeTimerRef.current = null;
    }, CARD_SETTLE_MS);
  }, [cardCount]);

  const selectRelative = useCallback((direction: number) => {
    selectIndex(activeIndexRef.current + direction);
  }, [selectIndex]);

  useEffect(() => () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
  }, []);

  return {
    activeIndex,
    previousIndex,
    selectIndex,
    selectRelative,
  };
}
