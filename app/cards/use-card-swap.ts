"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CARD_SETTLE_MS = 560;
const HOVER_INTENT_MS = 0;

export function useCardSwap(cardCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queuedIndexRef = useRef<number | null>(null);

  const cancelQueuedIndex = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    queuedIndexRef.current = null;
  }, []);

  const selectIndex = useCallback((nextIndex: number) => {
    const normalizedIndex = (nextIndex + cardCount) % cardCount;
    const currentIndex = activeIndexRef.current;
    cancelQueuedIndex();

    if (normalizedIndex === currentIndex) return;

    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setPreviousIndex(currentIndex);
    activeIndexRef.current = normalizedIndex;
    setActiveIndex(normalizedIndex);
    fadeTimerRef.current = setTimeout(() => {
      setPreviousIndex(null);
      fadeTimerRef.current = null;
    }, CARD_SETTLE_MS);
  }, [cancelQueuedIndex, cardCount]);

  const selectRelative = useCallback((direction: number) => {
    selectIndex(activeIndexRef.current + direction);
  }, [selectIndex]);

  const queueIndex = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndexRef.current || nextIndex === queuedIndexRef.current) return;
    cancelQueuedIndex();
    queuedIndexRef.current = nextIndex;
    hoverTimerRef.current = setTimeout(() => {
      queuedIndexRef.current = null;
      selectIndex(nextIndex);
    }, HOVER_INTENT_MS);
  }, [cancelQueuedIndex, selectIndex]);

  useEffect(() => () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }, []);

  return {
    activeIndex,
    previousIndex,
    selectIndex,
    selectRelative,
    queueIndex,
    cancelQueuedIndex,
  };
}
