import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-rgpd',
  templateUrl: './landing-rgpd.component.html',
  styleUrls: ['./landing-rgpd.component.scss']
})
export class LandingRgpdComponent {
  year = new Date().getFullYear();

  questions = [
    { label: 'Avez-vous un registre des traitements ?' },
    { label: 'Avez-vous informé vos salariés/clients sur leurs droits ?' },
    { label: 'Limitez-vous la conservation des données personnelles ?' },
    { label: 'Avez-vous une procédure en cas de violation de données ?' },
    { label: 'Avez-vous nommé un DPO (ou référent RGPD) ?' },
  ];

  answers: string[] = Array(this.questions.length).fill('');
  showResult = false;
  score = 0;
  email = '';

  estimate(): void {
    const points = this.answers.filter(a => a === 'oui').length;
    this.score = Math.round((points / this.questions.length) * 100);
    this.showResult = true;
  }

  scoreClass() {
    if (this.score < 50) return 'danger';
    if (this.score < 70) return 'warn';
    return 'ok';
  }

  submitLead(): void {
    // Appel à ton backend pour enregistrer le lead/email + score + answers
    alert('Merci, votre rapport va être envoyé par email ! (à brancher côté API)');
    // Reset :
    this.answers = Array(this.questions.length).fill('');
    this.showResult = false;
    this.score = 0;
    this.email = '';
  }

  scrollToTest() {
    document.getElementById('test')?.scrollIntoView({ behavior: 'smooth' });
  }
}
