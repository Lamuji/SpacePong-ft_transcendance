import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgCircleProgressModule } from 'ng-circle-progress/lib/ng-circle-progress.module';
import { AvatarComponent } from './user/components/avatar/avatar.component';

// Import UI Module
import { UiModule } from '../shared/ui/ui.module';

@NgModule({
  declarations: [
    NavBarComponent,
  ],
  exports: [
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    UiModule // Add UI Module
  ]
})
export class PrivateModule { }
