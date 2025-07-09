import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RgpdScore } from '../../models/rgpd-score.model';

@Injectable({ providedIn: 'root' })
export class RgpdService {
  constructor(private http: HttpClient) {}

  // Exigences RGPD
  getExigences(): Observable<any[]> {
    return this.http.get<any[]>('/api/rgpd/exigences');
  }

  // Liste des audits RGPD (optionnel: filtrer par user)
  getAudits(userId?: number): Observable<any[]> {
    return this.http.get<any[]>('/api/rgpd/audits', {
      params: userId ? { user_id: userId } : {},
    });
  }

  // Détail d’un audit (inclut score et exigences)
  getAudit(auditId: number): Observable<any> {
    return this.http.get<any>(`/api/rgpd/audit/${auditId}`);
  }

  // Scoring détaillé d’un audit (optionnel, si endpoint dédié)
  getScore(auditId: number): Observable<RgpdScore> {
    return this.http.get<RgpdScore>(`/api/rgpd/audits/${auditId}/score`);
  }

  // Créer un audit
  createAudit(audit: any): Observable<any> {
    return this.http.post<any>('/api/rgpd/audits', audit);
  }

  // Historique des audits par user (si besoin)
  getAuditHistory(userId: number): Observable<{audits: any[]}> {
    return this.http.get<{audits: any[]}>(`/api/rgpd/audits/${userId}`);
  }

  // Exports PDF/CSV
  downloadCsv(auditId: number) {
    return this.http.get(`/api/rgpd/audits/${auditId}/csv`, { responseType: 'blob' });
  }
  downloadPdf(auditId: number) {
    return this.http.get(`/api/rgpd/audits/${auditId}/pdf`, { responseType: 'blob' });
  }


  // Générateurs rapport
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

  // Récupère la synthèse du dernier audit RGPD d’un user
  getLastAudit(userId: number): Observable<any> {
    return this.http.get<any>(`/api/rgpd/audits?user_id=${userId}`);
  }
  
  // Récupère l’historique de scores pour la timeline
  getTimeline(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/rgpd/audits?user_id=${userId}`);
  }
  
  // Récupère la répartition des exigences par domaine
  getDomainStats(auditId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/rgpd/audits/${auditId}/domains`);
  }
}
