import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all UI components
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { InputComponent } from './input/input.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { ToastComponent } from './toast/toast.component';
import { GlowEffectDirective } from './directives/glow-effect.directive';
import { RippleDirective } from './directives/ripple.directive';

const UI_COMPONENTS = [
  ButtonComponent,
  CardComponent,
  InputComponent,
  LoaderComponent,
  ModalComponent,
  ToastComponent,
  GlowEffectDirective,
  RippleDirective
];

@NgModule({
  declarations: [
    ...UI_COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...UI_COMPONENTS
  ]
})
export class UiModule { }
