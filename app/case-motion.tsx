"use client";

import { useEffect, useRef, useState } from "react";

type CaseMotionProps = {
  frames: readonly string[];
  label: string;
  replayLabel: string;
};

export default function CaseMotion({ frames, label, replayLabel }: CaseMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(0);
  const [state, setState] = useState<"idle" | "playing" | "finished">("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setState("playing");
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (state !== "playing") return;
    const timer = window.setTimeout(() => setState("finished"), 8600);
    return () => window.clearTimeout(timer);
  }, [cycle, state]);

  const replay = () => {
    setCycle((value) => value + 1);
    setState("playing");
  };

  return (
    <div className="case-motion" ref={rootRef} data-state={state} aria-label={label}>
      <div className="case-motion-stage" key={cycle} role="img" aria-label={label}>
        {frames.map((src, index) => (
          <img
            className={`case-motion-frame case-motion-frame-${index + 1}`}
            src={src}
            alt=""
            width="1600"
            height="1000"
            loading="lazy"
            key={src}
          />
        ))}
      </div>
      <button className="case-motion-replay" type="button" onClick={replay}>
        {replayLabel}<span aria-hidden="true">↻</span>
      </button>
    </div>
  );
}
