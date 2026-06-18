import type Lenis from "lenis";

// Holds the active Lenis instance so components outside <SmoothScroll />
// (e.g. modals) can pause/resume smooth scrolling. Lenis drives scroll from
// its own RAF loop, so `overflow: hidden` alone does not stop it.
let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function lockScroll() {
  lenisInstance?.stop();
}

export function unlockScroll() {
  lenisInstance?.start();
}
