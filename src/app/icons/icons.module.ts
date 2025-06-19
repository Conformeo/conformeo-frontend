import { NgModule }                      from '@angular/core';
import { LucideAngularModule, Home, AlertTriangle, Check } from 'lucide-angular';

@NgModule({
  imports: [
    /** on “pick” une seule fois les icônes de l’app */
    LucideAngularModule.pick({ Home, AlertTriangle, Check })
  ],
  exports: [ LucideAngularModule ]
})
export class IconsModule {}
