import { BUBBLE_CONFIG, getBubbleCount } from './bubbleConfig';
import { saveState, loadState, createBubbleElement, getRandomPosition } from './bubbleHelpers';

export class BubblePhysics {
  private bubbles: HTMLElement[] = [];
  private velocities: Map<HTMLElement, { vx: number; vy: number }> = new Map();
  private container: HTMLElement | null = null;
  private animationId: number | null = null;
  private initialized = false;
  private resizeTimeout: number | null = null;

  init() {
    this.container = document.getElementById('floating-container');
    if (!this.container || this.initialized) return;

    const savedState = loadState();
    if (savedState) {
      this.restoreState(savedState);
    } else {
      this.createBubbles();
    }

    this.animate();
    this.initialized = true;

    window.addEventListener('resize', this.handleResize);
    setInterval(() => saveState(this.bubbles, this.velocities), BUBBLE_CONFIG.SAVE_INTERVAL);
  }

  private handleResize = () => {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

    this.resizeTimeout = window.setTimeout(() => {
      this.adjustBubblesForScreenSize();
      this.adjustBubblesPosition();
    }, BUBBLE_CONFIG.RESIZE_DEBOUNCE);
  };

  private createBubbles() {
    if (!this.container) return;

    const template = document.getElementById('bubble-templates') as HTMLTemplateElement;
    if (!template) return;

    const templates = Array.from(template.content.querySelectorAll('.bubble-template'));
    const containerRect = this.container.getBoundingClientRect();
    const targetCount = getBubbleCount(window.innerWidth);

    for (let i = 0; i < targetCount; i++) {
      const templateNode = templates[i % templates.length];
      const { x, y } = getRandomPosition(containerRect.width, containerRect.height, BUBBLE_CONFIG.BUBBLE_SIZE);
      const { bubble, velocity } = createBubbleElement(templateNode, x, y);

      this.velocities.set(bubble, velocity);
      this.container!.appendChild(bubble);
      this.bubbles.push(bubble);
    }
  }

  private adjustBubblesForScreenSize() {
    if (!this.container) return;

    const targetCount = getBubbleCount(window.innerWidth);
    const currentCount = this.bubbles.length;

    if (currentCount < targetCount) {
      this.addBubbles(targetCount - currentCount);
    } else if (currentCount > targetCount) {
      this.removeBubbles(currentCount - targetCount);
    }
  }

  private addBubbles(count: number) {
    const template = document.getElementById('bubble-templates') as HTMLTemplateElement;
    if (!template || !this.container) return;

    const templates = Array.from(template.content.querySelectorAll('.bubble-template'));
    const containerRect = this.container.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const templateNode = templates[(this.bubbles.length + i) % templates.length] as Element;
      const { x, y } = getRandomPosition(containerRect.width, containerRect.height, BUBBLE_CONFIG.BUBBLE_SIZE);
      const { bubble, velocity } = createBubbleElement(templateNode, x, y);

      this.velocities.set(bubble, velocity);
      this.container!.appendChild(bubble);
      this.bubbles.push(bubble);
    }
  }

  private removeBubbles(count: number) {
    for (let i = 0; i < count; i++) {
      const bubble = this.bubbles.pop();
      if (bubble) {
        this.velocities.delete(bubble);
        bubble.remove();
      }
    }
  }

  private adjustBubblesPosition() {
    if (!this.container) return;

    const containerRect = this.container.getBoundingClientRect();

    this.bubbles.forEach((bubble) => {
      const rect = bubble.getBoundingClientRect();
      const currentLeft = rect.left - containerRect.left;
      const currentTop = rect.top - containerRect.top;

      const newLeft = Math.max(0, Math.min(currentLeft, containerRect.width - rect.width));
      const newTop = Math.max(0, Math.min(currentTop, containerRect.height - rect.height));

      if (newLeft !== currentLeft || newTop !== currentTop) {
        bubble.style.left = `${newLeft}px`;
        bubble.style.top = `${newTop}px`;
      }
    });
  }

  private animate = () => {
    this.updatePositions();
    this.checkCollisions();
    this.animationId = requestAnimationFrame(this.animate);
  };

  private updatePositions() {
    if (!this.container) return;

    const containerRect = this.container.getBoundingClientRect();

    this.bubbles.forEach((bubble) => {
      const velocity = this.velocities.get(bubble);
      if (!velocity) return;

      const rect = bubble.getBoundingClientRect();
      const currentLeft = rect.left - containerRect.left;
      const currentTop = rect.top - containerRect.top;

      let newLeft = currentLeft + velocity.vx;
      let newTop = currentTop + velocity.vy;

      if (newLeft <= 0 || newLeft + rect.width >= containerRect.width) {
        velocity.vx *= -1;
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - rect.width));
      }

      if (newTop <= 0 || newTop + rect.height >= containerRect.height) {
        velocity.vy *= -1;
        newTop = Math.max(0, Math.min(newTop, containerRect.height - rect.height));
      }

      bubble.style.left = `${newLeft}px`;
      bubble.style.top = `${newTop}px`;
    });
  }

  private checkCollisions() {
    for (let i = 0; i < this.bubbles.length; i++) {
      for (let j = i + 1; j < this.bubbles.length; j++) {
        const bubble1 = this.bubbles[i];
        const bubble2 = this.bubbles[j];

        const rect1 = bubble1.getBoundingClientRect();
        const rect2 = bubble2.getBoundingClientRect();

        const dx = (rect1.left + rect1.width / 2) - (rect2.left + rect2.width / 2);
        const dy = (rect1.top + rect1.height / 2) - (rect2.top + rect2.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (rect1.width + rect2.width) / 2;

        if (distance < minDistance) {
          this.handleCollision(bubble1, bubble2, dx, dy, minDistance - distance);
        }
      }
    }
  }

  private handleCollision(bubble1: HTMLElement, bubble2: HTMLElement, dx: number, dy: number, overlap: number) {
    const vel1 = this.velocities.get(bubble1)!;
    const vel2 = this.velocities.get(bubble2)!;

    [vel1.vx, vel2.vx] = [vel2.vx, vel1.vx];
    [vel1.vy, vel2.vy] = [vel2.vy, vel1.vy];

    const angle = Math.atan2(dy, dx);
    const moveX = Math.cos(angle) * overlap / 2;
    const moveY = Math.sin(angle) * overlap / 2;

    const containerRect = this.container!.getBoundingClientRect();
    const rect1 = bubble1.getBoundingClientRect();
    const rect2 = bubble2.getBoundingClientRect();

    bubble1.style.left = `${rect1.left - containerRect.left + moveX}px`;
    bubble1.style.top = `${rect1.top - containerRect.top + moveY}px`;
    bubble2.style.left = `${rect2.left - containerRect.left - moveX}px`;
    bubble2.style.top = `${rect2.top - containerRect.top - moveY}px`;
  }

  private restoreState(state: any) {
    if (!this.container) return;

    const template = document.getElementById('bubble-templates') as HTMLTemplateElement;
    if (!template) return;

    const templates = Array.from(template.content.querySelectorAll('.bubble-template'));

    state.bubbles.forEach((bubbleData: any) => {
      const templateNode = templates.find((t) => t.getAttribute('data-lang') === bubbleData.lang);
      if (!templateNode) return;

      const bubble = templateNode.cloneNode(true) as HTMLElement;
      bubble.classList.remove('bubble-template');
      bubble.classList.add('bubble');
      bubble.setAttribute('data-lang', bubbleData.lang);
      bubble.style.left = bubbleData.left;
      bubble.style.top = bubbleData.top;

      this.velocities.set(bubble, { vx: bubbleData.vx, vy: bubbleData.vy });
      this.container!.appendChild(bubble);
      this.bubbles.push(bubble);
    });
  }

  destroy() {
    saveState(this.bubbles, this.velocities);

    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    window.removeEventListener('resize', this.handleResize);
  }
}
