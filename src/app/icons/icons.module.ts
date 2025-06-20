import { NgModule } from '@angular/core';
import {
  LucideAngularModule,
  Check,
  Clock,
  AlertTriangle,
  X,
} from 'lucide-angular';

/**
 * Module partageant uniquement les icônes nécessaires à l’app.
 */
@NgModule({
  imports: [
    LucideAngularModule.pick({
      Check,
      Clock,
      AlertTriangle,
      X,
    }),
  ],
  exports: [LucideAngularModule],
})
export class IconsModule {}
