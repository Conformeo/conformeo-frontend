import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RgpdScore } from '../../models/rgpd-score.model';
import { Obligation } from '../../models/obligation';

@Injectable({ providedIn: 'root' })
export class RgpdService {
  constructor(private http: HttpClient) {}

  // Exigences RGPD
  getExigences(): Observable<any[]> {
    return this.http.get<any[]>('/api/rgpd/exigences');
  }

  // Lister tous les audits RGPD pour un utilisateur
  getAudits(userId: number): Observable<any[]> {
    return this.http.get<any[]>('/api/rgpd/audits', {
      params: { user_id: userId }
    });
  }

  // Détail d’un audit RGPD
  getAudit(auditId: number): Observable<any> {
    return this.http.get<any>(`/api/rgpd/audits/${auditId}`);
  }

  // Score détaillé d’un audit (optionnel, si endpoint dédié)
  getScore(auditId: number): Observable<RgpdScore> {
    return this.http.get<RgpdScore>(`/api/rgpd/audits/${auditId}/score`);
  }

  // Créer un audit RGPD
  createAudit(audit: any): Observable<any> {
    return this.http.post<any>('/api/rgpd/audits', audit);
  }

  // Historique des audits (timeline)
  getTimeline(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/rgpd/audits/timeline?user_id=${userId}`);
  }

  // Synthèse du dernier audit RGPD d’un user
  getLastAudit(userId: number): Observable<any> {
    return this.http.get<any>(`/api/rgpd/audits/last?user_id=${userId}`);
  }

  // Export CSV/PDF d’un audit
  downloadCsv(auditId: number) {
    return this.http.get(`/api/rgpd/audits/${auditId}/csv`, { responseType: 'blob' });
  }
  downloadPdf(auditId: number) {
    return this.http.get(`/api/rgpd/audits/${auditId}/pdf`, { responseType: 'blob' });
  }

  // Répartition des exigences par domaine
  getDomainStats(auditId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/rgpd/audits/${auditId}/domains`);
  }

  // --------- Obligations dynamiques ---------
  getObligations(userId: number): Observable<Obligation[]> {
    return this.http.get<Obligation[]>(`/api/obligations?user_id=${userId}`);
  }

  // --------- Générateurs de rapports locaux (HTML/MD) ---------
  generateMarkdown(score: any): string {
    let md = `# Rapport RGPD\n\n**Score** : ${score.score}%\n\n`;
    md += `## Points critiques non conformes\n`;
    (score.critical_ko || []).forEach((item: any) => {
      md += `- **${item.label}** : ${item.answer}\n  > ${item.advice}\n`;
    });
    md += `\n## Détail des non conformités\n`;
    (score.ko || []).forEach((item: any) => {
      md += `- **${item.label}** : ${item.answer}\n  > ${item.advice}\n`;
    });
    return md;
  }

  generateHtml(score: any): string {
    let html = `<h1>Rapport RGPD</h1><p><b>Score :</b> ${score.score}%</p>`;
    html += `<h2>Points critiques non conformes</h2><ul>`;
    (score.critical_ko || []).forEach((item: any) => {
      html += `<li><b>${item.label}</b> : ${item.answer}<br/><i>${item.advice}</i></li>`;
    });
    html += `</ul><h2>Détail des non conformités</h2><ul>`;
    (score.ko || []).forEach((item: any) => {
      html += `<li><b>${item.label}</b> : ${item.answer}<br/><i>${item.advice}</i></li>`;
    });
    html += `</ul>`;
    return html;
  }
}
