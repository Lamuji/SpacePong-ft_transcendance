import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled || loading"
      (click)="handleClick($event)"
      [attr.aria-label]="ariaLabel"
    >
      <span *ngIf="loading" class="loader-spinner"></span>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() ariaLabel?: string;
  
  @Output() clicked = new EventEmitter<Event>();

  get buttonClasses(): string {
    return `btn btn-${this.variant} btn-${this.size} ${this.loading ? 'loading' : ''}`;
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
