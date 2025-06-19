import { NgModule } from '@angular/core';
import { LucideAngularModule,
         Home, AlertTriangle, CheckCircle,
         LayoutDashboard, BriefcaseBusiness, Building } from 'lucide-angular';

@NgModule({
  imports: [
    /** on “pick” une seule fois les icônes de l’app */
    LucideAngularModule.pick({
        Home, AlertTriangle, CheckCircle,
        LayoutDashboard, BriefcaseBusiness, Building
    })
  ],
  exports: [ LucideAngularModule ]
})
export class IconsModule {}
