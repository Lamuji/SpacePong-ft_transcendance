import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Import UI components (only the ones we created)
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { InputComponent } from './input/input.component';
import { LoaderComponent } from './loader/loader.component';

const UI_COMPONENTS = [
  ButtonComponent,
  CardComponent,
  InputComponent,
  LoaderComponent
];

@NgModule({
  declarations: [
    ...UI_COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ...UI_COMPONENTS
  ]
})
export class UiModule { }
