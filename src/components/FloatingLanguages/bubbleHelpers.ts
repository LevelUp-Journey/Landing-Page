import { BUBBLE_CONFIG } from './bubbleConfig';

export interface BubbleState {
  lang: string;
  left: string;
  top: string;
  vx: number;
  vy: number;
}

export interface SavedState {
  bubbles: BubbleState[];
  timestamp: number;
}

export function saveState(bubbles: HTMLElement[], velocities: Map<HTMLElement, { vx: number; vy: number }>) {
  const state: SavedState = {
    bubbles: bubbles.map((bubble) => {
      const velocity = velocities.get(bubble);
      const lang = bubble.getAttribute('data-lang') || '';
      return {
        lang,
        left: bubble.style.left,
        top: bubble.style.top,
        vx: velocity?.vx || 0,
        vy: velocity?.vy || 0,
      };
    }),
    timestamp: Date.now(),
  };

  try {
    sessionStorage.setItem(BUBBLE_CONFIG.STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Ignorar errores de storage
  }
}

export function loadState(): SavedState | null {
  try {
    const stored = sessionStorage.getItem(BUBBLE_CONFIG.STORAGE_KEY);
    if (!stored) return null;

    const state = JSON.parse(stored);

    if (Date.now() - state.timestamp > BUBBLE_CONFIG.STATE_EXPIRY) {
      sessionStorage.removeItem(BUBBLE_CONFIG.STORAGE_KEY);
      return null;
    }

    return state;
  } catch (e) {
    return null;
  }
}

export function createBubbleElement(
  templateNode: Element,
  x: number,
  y: number
): { bubble: HTMLElement; velocity: { vx: number; vy: number } } {
  const bubble = templateNode.cloneNode(true) as HTMLElement;
  bubble.classList.remove('bubble-template');
  bubble.classList.add('bubble');

  const lang = templateNode.getAttribute('data-lang');
  if (lang) {
    bubble.setAttribute('data-lang', lang);
  }

  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  const speed = BUBBLE_CONFIG.MIN_SPEED + Math.random() * (BUBBLE_CONFIG.MAX_SPEED - BUBBLE_CONFIG.MIN_SPEED);
  const angle = Math.random() * Math.PI * 2;

  return {
    bubble,
    velocity: {
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    },
  };
}

export function getRandomPosition(containerWidth: number, containerHeight: number, bubbleSize: number) {
  return {
    x: Math.random() * (containerWidth - bubbleSize),
    y: Math.random() * (containerHeight - bubbleSize),
  };
}
