---
name: playwright-reporting
description: Configuracion de reporteria, traces y screenshots.
---

## Reglas

- Activar `trace: 'on-first-retry'` en CI.
- Usar HTML reporter por defecto (`playwright-report/`).
- Adjuntar screenshots **solo en fallos** (`screenshot: 'only-on-failure'`).
- Grabar video solo en fallos (`video: 'retain-on-failure'`).
- Nombrar tests con patron: `<modulo> - <accion> - <resultado esperado>`.

## Configuracion recomendada

```typescript
// filepath: playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});
```

## Naming convention para tests

```typescript
// Correcto
test('Login - Ingresar credenciales validas - Redirige al dashboard');
test('Carrito - Agregar producto - Incrementa el contador');

// Evitar
test('test1');
test('should work');
```

## Inspeccion de fallos

Para abrir el reporte HTML tras una corrida fallida:

```bash
npx playwright show-report
```

Para abrir el trace de un test especifico:

```bash
npx playwright show-trace test-results/<carpeta>/trace.zip
```