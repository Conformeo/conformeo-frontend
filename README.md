# 🚀 Conforméo – Onboarding Développeur

Bienvenue ! Ce projet est organisé pour accélérer l’intégration de nouveaux devs et rendre la contribution ultra lisible.

---

## 📦 Structure du projet

core/ – logique globale (auth, interceptors, state…)
features/ – chaque fonctionnalité métier (RGPD, Dashboard, Ouvriers…)
shared/ – composants & pipes réutilisables partout
public/ – pages accessibles sans auth (landing…)
utils/ – utilitaires techniques (helpers, pipes custom…)
---

## ⚡ Prise en main rapide

- **Cloner le repo**  
  `git clone ...`
- **Installer**  
  `npm install`
- **Lancer local**  
  `ng serve --proxy-config proxy.conf.json`
- **Ouvrir**  
  [http://localhost:4200](http://localhost:4200)

---

## 💡 Ajout/édition d’une fonctionnalité (feature)

1. Crée ou va dans le dossier `/features/[feature]`
2. Génère une page routée  
   `ng generate component features/rgpd/pages/rgpd-score-page`
3. Génère un composant réutilisable  
   `ng generate component features/rgpd/components/exigence-table`
4. Génère un service  
   `ng generate service features/rgpd/rgpd`

---

## 🔀 Routines dev

- **Avant commit** :  
  `ng lint` et `ng test`
- **Branche** :  
  `feat/nom-feature`
- **Un README à jour** dans chaque feature

---

## 👩‍💻 Démarrer sur une nouvelle feature

- Crée un dossier dans `/features`
- Ajoute `/pages`, `/components`, `/services`, `xxx.module.ts`, `xxx.route.ts`, `README.md`
- Exporte tout ce qui est réutilisable dans `/shared`

---

## 🏷️ Nommage

- Page routée : `/pages/xxx-page/xxx-page.component.ts`
- Widget/card : `/components/xxx/xxx.component.ts`
- Service : `/services/xxx.service.ts`
- Module : `xxx.module.ts`
- Routing : `xxx.route.ts`

---

## 🚦 Onboarding express

- Lire ce README + ceux dans chaque feature
- Toute question = Michel ou équipe Slack/Discord
- Doc API : voir `/core/services/` ou services spécifiques features

---

## 💼 Astuces

- Préférer standalone components (Angular 15+)
- Favoriser lazy loading sur les gros modules métier
- Un `.spec.ts` à côté de chaque composant/service
- Utiliser `/shared` au max pour tout composant ou pipe réutilisé``


# 🟢 Checklist – Onboarding Développeur

- [ ] Cloner le repo et installer les dépendances
- [ ] Lire ce README + ceux des features concernées
- [ ] Lancer l’app (`ng serve ...`)
- [ ] Générer page/composant/service via CLI Angular
- [ ] Ajouter tests et mettre à jour README de la feature si modif structurante
- [ ] Relire/nommer ses commits + PR avant merge
- [ ] Poser des questions sur Slack/Discord si besoin


# Conseils et routines pour la scalabilité
- Chaque nouvelle fonctionnalité = un dossier dans /features
- Un README par feature (même mini)
- Utilise /shared et /core pour DRY (Don't Repeat Yourself)
- Lazy loading des routes pour accélérer le front
- Favorise la lisibilité avant la concision (meilleurs onboarding & évolutions)
- Relis la doc et update-la à chaque sprint !



# Dashboard Cockpit Conforméo

- Chaque module (RGPD, DUERP, etc.) est un composant indépendant.
- Pour afficher/cacher un bloc, modifie l’objet `modulesActive` dans le cockpit.
- Pour brancher un nouveau module :
  1. Crée le composant “dashboard-xxx.component.ts”
  2. Importe-le dans `dashboard-cockpit.component.ts`
  3. Ajoute-le dans le template avec `*ngIf="modulesActive.xxx"`

Le cockpit fonctionne comme un “lego” SaaS : chaque bloc = une feature.
