import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div [class]="loaderClasses">
      <div class="loader-content">
        <div *ngIf="type === 'spinner'" class="loader-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        
        <div *ngIf="type === 'pong'" class="loader-pong">
          <div class="pong-ball"></div>
          <div class="pong-paddle left"></div>
          <div class="pong-paddle right"></div>
        </div>
        
        <div *ngIf="type === 'rocket'" class="loader-rocket">
          <div class="rocket">🚀</div>
          <div class="rocket-trail"></div>
        </div>
        
        <div *ngIf="message" class="loader-message">{{ message }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() type: 'spinner' | 'pong' | 'rocket' = 'spinner';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() message?: string;
  @Input() overlay = false;

  get loaderClasses(): string {
    return `loader loader-${this.size} ${this.overlay ? 'overlay' : ''}`;
  }
}
