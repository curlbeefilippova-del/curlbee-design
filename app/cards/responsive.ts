export function canOpenCardLightbox() {
  return !window.matchMedia("(max-width: 820px), (pointer: coarse)").matches;
}
