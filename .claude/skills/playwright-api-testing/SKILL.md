---
name: playwright-api-testing
description: Estandar para testing de APIs con la fixture request de Playwright.
---

## Reglas

- Usar la fixture `request` para endpoints REST.
- Validar status, headers y body con `expect()`.
- Separar tests de UI y API en carpetas distintas.
- Reutilizar tokens de auth entre specs con fixtures personalizadas.
- No hardcodear URLs base — usar `baseURL` del config.
- Validar contratos JSON con `toMatchSchema()` cuando aplique.

## Estructura recomendada

```
tests/
├── api/
│   ├── users.spec.ts
│   └── products.spec.ts
└── ui/
    └── login.spec.ts
```

## Ejemplo de test de API

```typescript
// filepath: tests/api/users.spec.ts
import { test, expect } from '@playwright/test';

test('GET /users - Lista usuarios correctamente', async ({ request }) => {
  const response = await request.get('/api/users');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});

test('POST /users - Crea un usuario nuevo', async ({ request }) => {
  const newUser = {
    name: 'Juan',
    email: `juan${Date.now()}@test.com`,
  };

  const response = await request.post('/api/users', { data: newUser });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toMatchObject(newUser);
});
```

## Setup global (auth compartido)

```typescript
// filepath: playwright.config.ts
export default defineConfig({
  use: {
    baseURL: 'https://api.ejemplo.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  },
});
```