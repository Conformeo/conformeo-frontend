// src/app/shared/validators/date-order.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Vérifie que dateA <= dateB (format yyyy-MM-dd)
 * @param dateA Nom du ctrl 1
 * @param dateB Nom du ctrl 2
 */
export function dateOrder(dateA: string, dateB: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const a = group.get(dateA)?.value as string;
    const b = group.get(dateB)?.value as string;

    if (!a || !b) { return null; }

    return a <= b ? null : { dateOrder: true };
  };
}
