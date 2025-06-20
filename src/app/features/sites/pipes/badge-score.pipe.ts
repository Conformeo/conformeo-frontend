// src/app/features/sites/pipes/badge-score.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'badgeScore', standalone: true })
export class BadgeScorePipe implements PipeTransform {
  transform(score: number): string {
    if (score >= 90)   return 'bg-green-600';
    if (score >= 75)   return 'bg-yellow-500';
    return 'bg-red-600';
  }
}
