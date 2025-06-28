import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {
  
  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.createRipple(event);
  }

  private createRipple(event: MouseEvent): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `;

    // Ensure the parent element has position relative
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }
    
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Add CSS animation if not already present
    this.addRippleStyles();

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  private addRippleStyles(): void {
    const styleId = 'ripple-animation-styles';
    
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes ripple-animation {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}
