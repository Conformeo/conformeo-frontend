// src/test.ts

// Polyfills pour Zone.js utilisées par Angular
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialisation de l’environnement de test Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Ensuite, on cherche et on charge tous les fichiers *.spec.ts
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
