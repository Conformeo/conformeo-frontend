
# Module RGPD

## Pages

- `/pages/dashboard-rgpd/` : Synthèse scoring RGPD (widget cockpit)
- `/pages/rgpd-score/` : Détail d’un audit (table exigences, exports)
- `/pages/rgpd-history/` : Historique audits RGPD

## Composants

- `/components/exigence-table/` : Table dynamique exigences
- `/components/exigence-detail-dialog/` : Modal détail exigence

## Routing interne

- `/rgpd` : Synthèse RGPD (DashboardRgpdComponent)
- `/rgpd/audit/:id` : Détail d’un audit (RgpdScoreComponent)
- `/rgpd/history` : Historique (RgpdHistoryComponent)

## Astuces

- Tous les composants sont “standalone” si possible
- Les tests `.spec.ts` sont à compléter à chaque ajout
- Utiliser `rgpd.service.ts` pour tout accès API ou logique métier RGPD
