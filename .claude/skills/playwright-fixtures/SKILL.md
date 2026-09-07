---
name: playwright-fixtures
description: Gestion de fixtures y datos de prueba en Playwright.
---

## Reglas

- Usar archivos JSON en `tests/fixtures/` para datos estaticos.
- Usar factories (Faker.js) para datos dinamicos.
- Nunca compartir estado mutable entre tests.
- Limpiar cookies y `localStorage` en `beforeEach` cuando aplique.
- Centralizar usuarios de prueba en un solo archivo.
- No hardcodear credenciales en los specs.

## Estructura recomendada

```
tests/
├── fixtures/
│   ├── users.json
│   └── products.json
├── helpers/
│   └── factories.ts
└── specs/
```

## Ejemplo de factory

```typescript
// filepath: tests/helpers/factories.ts
import { faker } from '@faker-js/faker';

export function generateUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
```

## Ejemplo de fixture estatico

```json
// filepath: tests/fixtures/users.json
{
  "admin": {
    "email": "admin@test.com",
    "password": "Admin123!"
  },
  "standard": {
    "email": "user@test.com",
    "password": "User123!"
  }
}
```

## Uso en spec

```typescript
// filepath: tests/specs/login.spec.ts
import users from '../fixtures/users.json';

test('admin login', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(users.admin.email);
  await page.getByLabel('Contrasena').fill(users.standard.password);
  await page.getByRole('button', { name: 'Ingresar' }).click();
});
```