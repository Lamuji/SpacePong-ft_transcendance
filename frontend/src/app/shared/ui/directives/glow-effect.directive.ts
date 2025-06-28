import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appGlowEffect]'
})
export class GlowEffectDirective implements OnInit, OnDestroy {
  @Input() glowColor = '#00ffff';
  @Input() glowIntensity = '20px';
  @Input() animationDuration = '2s';

  private animationId?: number;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.applyGlowEffect();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private applyGlowEffect(): void {
    const element = this.el.nativeElement;
    
    // Set initial glow
    element.style.filter = `drop-shadow(0 0 ${this.glowIntensity} ${this.glowColor})`;
    element.style.transition = `filter ${this.animationDuration} ease-in-out`;
    
    // Add hover effect
    element.addEventListener('mouseenter', () => {
      element.style.filter = `drop-shadow(0 0 ${parseInt(this.glowIntensity) * 1.5}px ${this.glowColor})`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.filter = `drop-shadow(0 0 ${this.glowIntensity} ${this.glowColor})`;
    });
  }
}
