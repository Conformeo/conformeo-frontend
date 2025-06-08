/* eslint-disable @typescript-eslint/no-explicit-any */
// src/test.ts

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Charger tous les *.spec.ts
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
