import { NgModule } from '@angular/core';
import { 
    LucideAngularModule, 
    Home, 
    AlertTriangle,
    CheckCircle 
} from 'lucide-angular';   //  👈  nouvel import


@NgModule({
  imports: [
    /** on “pick” une seule fois les icônes de l’app */
    LucideAngularModule.pick({ 
        Home, 
        AlertTriangle, 
        CheckCircle 
    })
  ],
  exports: [ LucideAngularModule ]
})
export class IconsModule {}
