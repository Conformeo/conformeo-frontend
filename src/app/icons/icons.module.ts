import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  LucideAngularModule,
  LayoutDashboard, Briefcase, MapPin, Bell, Home, CheckCircle,
  Check, Clock, X, AlertTriangle, XCircle, Pickaxe, HardHat, TriangleAlert
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      LayoutDashboard, Briefcase, MapPin, Bell, Home, CheckCircle,
      Check, Clock, X, AlertTriangle, XCircle, Pickaxe, HardHat, TriangleAlert
    }),
    MatSnackBarModule
  ],
  exports: [LucideAngularModule],
})
export class IconsModule {}


