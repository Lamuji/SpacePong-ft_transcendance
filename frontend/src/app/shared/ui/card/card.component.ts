import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div [class]="cardClasses">
      <div *ngIf="title" class="card-header">
        <h3 class="card-title">{{ title }}</h3>
        <div *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</div>
      </div>
      
      <div class="card-content">
        <ng-content></ng-content>
      </div>
      
      <div *ngIf="hasFooter" class="card-footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() variant: 'default' | 'highlighted' | 'game' = 'default';
  @Input() hasFooter = false;

  get cardClasses(): string {
    return `card card-${this.variant}`;
  }
}
