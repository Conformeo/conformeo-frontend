# 🚦 Routine de navigation cockpit Conforméo

## Structure générale

- Le cockpit (dashboard principal) est composé de mini-dashboards indépendants : RGPD, DUERP, Ouvriers, etc.
- Chaque bloc peut être activé/désactivé via `modulesActive` dans le composant cockpit.
- **Pour chaque module** : un composant “dashboard-[module].component.ts/html”.

## Navigation Angular recommandée

- La navigation (drilldown) se fait toujours via une méthode TypeScript, jamais en HTML !

### Exemple dans dashboard-duerp.component.ts

```typescript
import { Router } from '@angular/router';
constructor(private router: Router) {}
voirDuerp() { this.router.navigate(['/duerp/detail']); }


# Cockpit Conforméo – Routine SaaS modulaire

Bienvenue ! Ce projet Angular utilise une architecture cockpit :  
chaque “feature métier” (RGPD, DUERP, Certif, Ouvriers…) est indépendante et branchable dans le cockpit principal.

## 🧩 Comment ajouter un module cockpit ?

1. **Crée un composant dashboard-xxx**
   - Ex : `src/app/features/duerp/pages/dashboard-duerp/dashboard-duerp.component.ts`
2. **Prévois des données de synthèse** (mock ou API, ex : nombre de risques, graphiques, alertes…)
3. **Implémente un bouton “détail” qui appelle une méthode TS pour naviguer**
   - Ex :  
     ```typescript
     voirDetail() { this.router.navigate(['/duerp/detail']); }
     ```
4. **Importe le composant dans `dashboard-cockpit.component.ts`**
   - Ajoute dans `imports: [...]` et dans `modulesActive` si tu veux le rendre activable/désactivable.
5. **Ajoute le bloc dans le HTML du cockpit**
   - Ex :  
     ```html
     <section *ngIf="modulesActive.duerp" class="dashboard-block">
       <app-dashboard-duerp></app-dashboard-duerp>
     </section>
     ```
6. **Ton module apparaît dans le cockpit, prêt à l’emploi !**

## 👨‍💻 Routine dev quotidienne

- **Navigation Angular uniquement via TS** (jamais `[routerLink]` dans le HTML cockpit)
- **Chaque module gère son affichage et ses données**
- **Le cockpit n’a pas de dépendance forte vers les modules : chacun est plug & play**

## 🗂️ Arborescence type

