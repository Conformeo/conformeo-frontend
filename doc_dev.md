# Onboarding Dev – Projet Conforméo

## Prérequis

- Node.js + Angular CLI
- Lancer : `npm install && ng serve`
- Utiliser VSCode avec le plugin Angular Essentials

## Structure du projet

- `/core/` : logique applicative transversale (auth, guards, interceptors)
- `/features/` : 1 dossier = 1 grande fonctionnalité métier (ex: RGPD, Dashboard, Ouvriers)
- `/shared/` : composants, pipes, directives réutilisables
- `/public/pages/` : landing pages accessibles sans auth

## Nommage

- Composant routé = `pages/xxx-page/xxx-page.component.ts`
- Widget/card/dialog = `components/xxx/xxx.component.ts`
- Service métier = `xxx.service.ts`
- Module Angular = `xxx.module.ts`
- Routes internes = `xxx.route.ts`

## Ajouter une nouvelle feature

1. Crée le dossier dans `/features/`
2. Génère tes pages et composants avec le CLI Angular
3. Ajoute le module à l’app principale (`app-routing.module.ts` ou dans un module parent)
4. Mets à jour le menu si besoin

## Bonnes pratiques

- Utilise le lazy loading pour chaque grosse feature
- Chaque composant doit être réutilisable dans plusieurs pages
- Ajoute toujours un README.md à chaque module/feature
- Tests : fichiers `.spec.ts` à côté de chaque composant/service
- On commit : **tests passent, pas de linter error, pas de warning bloquant**

---

# Démo (CLI)

```sh
ng generate module features/toto
ng generate component features/toto/pages/toto-page
ng generate component features/toto/components/toto-card
ng generate service features/toto/toto
