export const BUBBLE_CONFIG = {
  MIN_BUBBLES: 13,
  MAX_BUBBLES: 20,
  BUBBLE_SIZE: 55,
  MIN_SPEED: 0.135,
  MAX_SPEED: 0.27,
  STORAGE_KEY: 'floating-bubbles-state',
  STATE_EXPIRY: 5 * 60 * 1000, // 5 minutos
  SAVE_INTERVAL: 1000, // 1 segundo
  RESIZE_DEBOUNCE: 100, // 100ms
} as const;

export const RESPONSIVE_SIZES = {
  mobile: { maxWidth: 480, size: 35 },
  tablet: { maxWidth: 768, size: 40 },
  desktop: { maxWidth: 1024, size: 55 },
} as const;

export function getBubbleCount(width: number): number {
  if (width > 1024) return BUBBLE_CONFIG.MAX_BUBBLES;
  if (width > 768) return Math.floor((BUBBLE_CONFIG.MIN_BUBBLES + BUBBLE_CONFIG.MAX_BUBBLES) / 2);
  return BUBBLE_CONFIG.MIN_BUBBLES;
}
